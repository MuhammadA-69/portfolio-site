import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
