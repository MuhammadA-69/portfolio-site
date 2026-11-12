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

test("fieldwork controls and current profile details are rendered", async () => {
  const html = await readExport("index.html");
  assert.match(html, /Explore fieldwork photographs/);
  assert.match(html, /The exhibition/);
  assert.match(html, /aria-pressed="true"/);
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
    assert.doesNotMatch(html, /Pause motion|Resume motion|↗/);
    assert.match(html, /GeistSerif/i);
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

test("local Geist fonts and reduced motion support are retained", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /--paper:#f1f2ee/);
  assert.match(css, /prefers-reduced-motion/);
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /GeistSerif-Regular.woff2/);
  assert.match(layout, /Geist-Regular.woff2/);
  assert.doesNotMatch(layout, /next\/font\/google/);
});

test("navigation and fieldwork retain accessible static fallbacks", async () => {
  const html = await readExport("index.html");
  assert.match(html, /aria-controls="mobile-menu"/);
  assert.match(html, /kafart-hands-of-resilience.jpg/);
  assert.match(html, /aria-live="polite"/);
  assert.doesNotMatch(html, /viewport-fade|ASCII planet/);
});

test("gallery arrows are labelled and omitted for single-image projects", async () => {
  const kafart = await readExport("work/kafart/index.html");
  assert.match(kafart, /aria-label="Previous image"/);
  assert.match(kafart, /aria-label="Next image"/);
  const budanza = await readExport("work/budanza/index.html");
  assert.match(budanza, /image-dialog-single/);
  assert.doesNotMatch(budanza, /aria-label="Next image"/);
});
