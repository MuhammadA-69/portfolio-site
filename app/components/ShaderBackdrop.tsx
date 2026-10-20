"use client";

import { useEffect, useRef } from "react";

const vertex = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const fragment = `
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float variant;
uniform float material;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float field(vec2 p){float n=0.,a=.5;for(int i=0;i<4;i++){n+=a*noise(p);p=p*2.03+5.1;a*=.5;}return n;}
void main(){
  vec2 uv=gl_FragCoord.xy/resolution;
  vec2 p=uv*vec2(resolution.x/resolution.y,1.)*1.8;
  float t=time*.045;
  float n=field(p+vec2(field(p+vec2(t,0.)),field(p+vec2(0.,-t))));
  // Each project has a different material, not merely another tint.
  if(material>.5 && material<1.5){
    vec2 warp=p+vec2(n*.45,t*.1);
    float threads=sin(warp.x*32.+sin(warp.y*4.+t))*sin(warp.y*32.+sin(warp.x*4.-t));
    n=.3+.4*n+.2*threads;
  }else if(material<2.5 && material>1.5){
    float contour=field(p*.85+vec2(t*.3,-t*.15));
    n=.25+.5*contour+.17*cos(contour*65.-t*2.);
  }else if(material<3.5 && material>2.5){
    float a=length(p-vec2(.4,.35)),b=length(p-vec2(2.1,.8));
    n=.48+.16*sin(a*16.-t*2.)+.16*sin(b*18.+t*1.4);
  }else if(material<4.5 && material>3.5){
    float ribbon=sin(p.y*9.+sin(p.x*2.+t)*2.+t);
    n=.38+.22*ribbon+.15*field(p*3.);
  }else if(material<5.5 && material>4.5){
    vec2 flow=p*4.+vec2(t*.25,-t*.15);
    vec2 cell=abs(fract(flow)-.5);
    float circuit=1.-smoothstep(.015,.06,min(cell.x,cell.y));
    float node=1.-smoothstep(.015,.05,length(cell));
    n=.2+.25*field(p+vec2(t))+.22*circuit+.25*node;
  }else if(material>5.5){
    n=.38+.2*sin(p.x*3.+p.y*5.+field(p+vec2(t,-t))*7.)+.18*field(p*1.5);
  }
  float cut=smoothstep(.18,.72,n);
  vec3 citrus=vec3(.72,.81,.45),coral=vec3(.92,.51,.34),bone=vec3(.91,.88,.71);
  vec3 a=mix(citrus,coral,variant);
  if(material>1.5 && material<2.5) a=vec3(.57,.76,.52);
  if(material>2.5 && material<3.5) a=vec3(.92,.55,.32);
  if(material>3.5 && material<4.5) a=vec3(.78,.58,.5);
  if(material>4.5 && material<5.5) a=vec3(.73,.78,.42);
  if(material>5.5){a=vec3(.55);bone=vec3(.8);}
  vec3 color=mix(vec3(.078),mix(a,bone,smoothstep(.4,.85,n)),pow(cut,1.1));
  float bands=smoothstep(.485,.515,fract(n*8.+t*.15));
  color*=.8+.2*bands;
  color+=(hash(gl_FragCoord.xy)-.5)*.055;
  gl_FragColor=vec4(color,1.);
}`;

/** A local GLSL material, with a CSS-gradient fallback and no network calls. */
export function ShaderBackdrop({ variant = 0, material = 0, paused = false, className = "" }: {
  variant?: number; material?: number; paused?: boolean; className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    function compile(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source); gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) { gl!.deleteShader(shader); return null; }
      shaders.push(shader); return shader;
    }
    const vert = compile(gl.VERTEX_SHADER, vertex);
    const frag = compile(gl.FRAGMENT_SHADER, fragment);
    const program = gl.createProgram();
    if (!vert || !frag || !program) { shaders.forEach((shader) => gl.deleteShader(shader)); return; }
    gl.attachShader(program, vert); gl.attachShader(program, frag); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program); shaders.forEach((shader) => gl.deleteShader(shader)); return;
    }
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const size = gl.getUniformLocation(program, "resolution");
    const time = gl.getUniformLocation(program, "time");
    gl.uniform1f(gl.getUniformLocation(program, "variant"), variant);
    gl.uniform1f(gl.getUniformLocation(program, "material"), material);
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, visible = true, last = 0, elapsed = 0;
    const stopped = () => paused || motion.matches || document.documentElement.dataset.motion === "paused";
    function draw() {
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(size, canvas!.width, canvas!.height); gl!.uniform1f(time, elapsed);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      canvas!.dataset.rendered = "true";
    }
    function tick(now: number) {
      frame = 0;
      if (!visible || document.hidden || stopped()) return;
      if (now - last > 1000/24) { elapsed += Math.min((now-last)/1000,.1); last=now; draw(); }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame); frame=0; last=performance.now();
      if (document.hidden || !visible) return;
      draw();
      if (!stopped()) frame=requestAnimationFrame(tick);
    }
    const resize = new ResizeObserver(() => {
      canvas!.width = Math.max(1, Math.round(canvas!.clientWidth * Math.min(devicePixelRatio, 1.25)));
      canvas!.height = Math.max(1, Math.round(canvas!.clientHeight * Math.min(devicePixelRatio, 1.25)));
      sync();
    });
    resize.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; sync(); });
    observer.observe(canvas);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("portfolio-motion-change", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
      motion.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("portfolio-motion-change", sync);
      gl.deleteBuffer(buffer); gl.deleteProgram(program); shaders.forEach((shader) => gl.deleteShader(shader));
    };
  }, [variant, material, paused]);
  return <canvas ref={ref} className={`shader-backdrop ${className}`} aria-hidden="true" />;
}
