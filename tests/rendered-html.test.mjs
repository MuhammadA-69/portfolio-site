import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${pathname.replaceAll("/", "-")}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: {
        accept: "text/html",
        host: "muhammad-alamin-yushau.test",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Muhammad Al-amin Yusha(?:&apos;|&#x27;|')u/);
  assert.match(
    html,
    /I build the systems and stories that move cultural work into public life\./,
  );
  assert.match(html, /Selected work/);
  assert.match(html, /KAFART/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the KAFART case study", async () => {
  const response = await render("/work/kafart");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /KAFART/);
  assert.match(html, /English, French and Hausa/);
  assert.match(html, /augmented(?:-| )reality/i);
  assert.match(html, /British Council/i);
});
