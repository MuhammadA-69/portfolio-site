import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const readExport = (path) =>
  readFile(new URL(`../out/${path}`, import.meta.url), "utf8");

test("the homepage is present in the static export", async () => {
  const html = await readExport("index.html");

  assert.match(html, /Muhammad/);
  assert.match(html, /Selected work/);
  assert.doesNotMatch(html, /ChatGPT|OpenAI|signin-with-chatgpt/i);
});

test("project pages are generated statically", async () => {
  const html = await readExport("work/kafart/index.html");

  assert.match(html, /KAFART/);
  assert.match(html, /All work/);
});

test("the interactive hero retains accessible controls and current profile details", async () => {
  const html = await readExport("index.html");
  assert.match(html, /Say hello to the ASCII planet/);
  assert.match(html, /Pause planet animation/);
  assert.match(html, /4\.83\/5\.00/);
  assert.match(html, /muhammad-alamin-yushau-cv\.pdf/);
  assert.match(html, /northern-creatives-conference/);
  assert.match(html, /subject-to-climate/);
});

test("all established routes still export with the current CV", async () => {
  for (const route of ["about", "work", "work/subject-to-climate", "work/northern-creatives-conference", "work/editorial-work", "work/alama", "work/budanza"]) {
    const html = await readExport(`${route}/index.html`);
    assert.match(html, /muhammad-alamin-yushau-cv\.pdf/);
    assert.doesNotMatch(html, /signin-with-chatgpt/i);
  }
  const cv = await readFile(new URL("../out/downloads/muhammad-alamin-yushau-cv.pdf", import.meta.url));
  assert.equal(cv.subarray(0, 4).toString(), "%PDF");
});

test("homepage media, styles, scripts and CV resolve beneath the Pages base path", async () => {
  const html = await readExport("index.html");
  const resources = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((href) => /^\/(?:portfolio-site\/)?(?:assets|downloads|_next\/static)\//.test(href));
  assert.ok(resources.length > 8);
  for (const resource of new Set(resources)) {
    const relative = decodeURIComponent(resource.split("?")[0].replace(/^\/portfolio-site/, "").replace(/^\//, ""));
    await access(new URL(`../out/${relative}`, import.meta.url));
  }
});

test("the redesign retains the requested content and removes the superseded role", async () => {
  for (const route of ["index.html", "about/index.html", "work/index.html"]) {
    const html = await readExport(route);
    assert.doesNotMatch(html, /Abuja Art Fair|Aisha Aliyu|live field of points|SignalField/i);
    assert.match(html, /Pause motion/);
    assert.match(html, /archivo/i);
  }
  const about = await readExport("about/index.html");
  assert.match(about, /Social media management/);
  assert.match(about, /Visual design and brand identity/);
  assert.match(about, /about-headshot.jpg/);
  const work = await readExport("work/index.html");
  assert.match(work, /Filter projects by discipline/);
  assert.match(work, /aria-pressed="true"/);
  const project = await readExport("work/kafart/index.html");
  assert.match(project, /Project image viewer/);
  assert.match(project, /Enlarge:/);
});

test("the dark visual system has gradient and shader fallbacks without navy", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /--paper: #141414/);
  assert.match(css, /linear-gradient/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /00002b|deep-blue/i);
  const shader = await readFile(new URL("../app/components/ShaderBackdrop.tsx", import.meta.url), "utf8");
  assert.match(shader, /getContext\("webgl"/);
  assert.match(shader, /portfolio-motion-change/);
  assert.match(shader, /uniform float material/);
  assert.match(shader, /threads=/);
  assert.match(shader, /contour=/);
  assert.match(shader, /ribbon=/);
  assert.match(shader, /circuit=/);
});

test("navigation and motion controls retain accessible static fallbacks", async () => {
  const html = await readExport("index.html");
  assert.match(html, /aria-controls="mobile-menu"/);
  assert.match(html, /aria-label="Pause motion"/);
  assert.match(html, /aria-label="Pause planet animation"/);
  assert.match(html, /class="viewport-fade" data-hidden="true" aria-hidden="true"/);
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.contribution-list \{ list-style: disc outside/);
});

test("gallery arrows are labelled and omitted for single-image projects", async () => {
  const kafart = await readExport("work/kafart/index.html");
  assert.match(kafart, /aria-label="Previous image"/);
  assert.match(kafart, /aria-label="Next image"/);
  const budanza = await readExport("work/budanza/index.html");
  assert.match(budanza, /image-dialog-single/);
  assert.doesNotMatch(budanza, /aria-label="Next image"/);
});
