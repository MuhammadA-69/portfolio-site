"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { sitePath } from "../site-path";
const scenes = [
 { label: "The exhibition", image: "kafart-hands-of-resilience-noir.jpg", alt: "Visitors in the Hands of Resilience exhibition", caption: "Hands of Resilience · KAFART", detail: "Curatorial coordination, and the conversations around the work." },
 { label: "The community", image: "kafart-group-pic.jpg", alt: "Artists and participants gathered at KAFART", caption: "People behind the programme · KAFART", detail: "Building a public for art, and a community around its makers." },
 { label: "The conversation", image: "kafart-panel.jpg", alt: "Speakers on stage at the KAFART panel", caption: "Future Forward · KAFART 2024", detail: "Moderating an exchange on culture, creativity and what comes next." },
];
export function FieldNotes() {
 const [active, setActive] = useState(0);
 const scene = scenes[active];
 return <div className="field-notes">
  <div className="scene-select" role="group" aria-label="Explore fieldwork photographs">{scenes.map((item, index) => <button key={item.label} aria-pressed={active === index} onClick={() => setActive(index)}>{item.label}</button>)}</div>
  <figure aria-live="polite" aria-atomic="true"><div className="scene-image"><img key={scene.image} src={sitePath(`/assets/${scene.image}`)} alt={scene.alt} /></div><figcaption><span>{scene.caption}</span><span>{scene.detail}</span></figcaption></figure>
 </div>;
}
