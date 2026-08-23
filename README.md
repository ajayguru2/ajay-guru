# ajay.guru

Personal site. Astro, diagrams drawn in [D2](https://d2lang.com) at build time, no client JavaScript except the light/dark switch.

```sh
brew install d2        # once; diagrams need the D2 binary (CI installs v0.8.1)
npm install
npm run dev            # http://localhost:4321
npm run build          # → dist/
```

**Add a thought:** create `src/content/thoughts/<slug>.md` with `title`, `date`, optional `updated` and `summary`. A filename starting with `_` stays unpublished. A thought is listed by `updated ?? date`, newest first.

**Add a diagram:** a fenced ```` ```d2 title="what the chart shows" ```` block. Start it with `...@_theme.d2` and `*.style: {bold: false; stroke-width: 1}` so it takes the site's colours and font. Keep it ≤ 680 px wide (`direction: down` for long flows).

**Edit work:** `src/content/work/NN-name.md` — `title` is the system, `byline` is org · role · period, `blurb` is the one-liner on the home page; the body is the long form. Filename prefix sets the order.

**Design rules:** see [DESIGN.md](DESIGN.md) before adding a page, class or dependency.

**Deploy:** push to `main`; GitHub Actions builds and publishes to Pages.
