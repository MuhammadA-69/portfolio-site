# Muhammad Al-amin Yusha'u Portfolio

An editorial portfolio for a communications strategist working across cultural
programming, public engagement and responsible technology.

## Development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm test
```

## GitHub Pages

The site is a static Next.js export. Pushing the `main` branch runs
`.github/workflows/deploy-pages.yml`, builds the site into `out`, and publishes
that directory to GitHub Pages.

In the GitHub repository, open **Settings → Pages** and set **Source** to
**GitHub Actions** before the first deployment.

Selected project evidence is stored in `public/assets`, and the downloadable
CV is stored in `public/downloads`.
