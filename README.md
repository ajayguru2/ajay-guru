# ajay.guru

Personal site. Astro, diagrams drawn in [D2](https://d2lang.com) at build time, no client JavaScript.

```sh
brew install d2        # once; diagrams need the D2 binary (CI installs v0.8.1)
npm install
npm run dev            # http://localhost:4321
npm run build          # → dist/
```

## Writing

```sh
npm run new "Title of the thought"   # → src/content/thoughts/_title-of-the-thought.md
npm run dev                          # http://localhost:4321 — drafts included
npm run share                        # → the preview site, drafts included, noindex
npm run publish title-of-the-thought # drops the _, commits src/content, pushes main → live
```

A filename starting with `_` is a draft: `npm run dev` and the preview site show it (marked
"draft"), the live site, RSS and the sitemap never do. No pull request is involved — `publish`
commits only `src/content`, so a typo fix can never carry half-finished code with it. Code changes
still go through a normal commit to `main`.

`npm run share` force-pushes the working tree — uncommitted and untracked files and all — to the
`preview` branch, which builds to a separate URL. It writes a commit straight from the files on
disk, so your branch, your index and your working tree are untouched.

A thought needs `title` and `date`, and takes `updated` and `summary`. It is listed by
`updated ?? date`, newest first.

**Add a diagram:** a fenced ```` ```d2 title="what the chart shows" ```` block. Start it with `...@_theme.d2` and `*.style: {bold: false; stroke-width: 1}` so it takes the site's colours and font. Keep it ≤ 680 px wide (`direction: down` for long flows).

**Edit work:** `src/content/work/NN-name.md` — `title` is the system, `byline` is org · role · period, `blurb` is the one-liner on the home page; the body is the long form. Filename prefix sets the order.

**Design rules:** see [DESIGN.md](DESIGN.md) before adding a page, class or dependency.

## Deploy

`main` builds and publishes to GitHub Pages at https://ajay.guru.

`preview` builds with drafts to Cloudflare Pages at https://ajay-guru-preview.pages.dev. It sends
`Disallow: /` to robots, ships no sitemap and no `CNAME`, and runs on a different host, so nothing
on that branch can reach the domain. It needs two repository secrets, `CLOUDFLARE_API_TOKEN` (a
token with the *Cloudflare Pages: Edit* permission) and `CLOUDFLARE_ACCOUNT_ID`; the first run
creates the Pages project.

To reach it at `preview.ajay.guru` instead: add the custom domain to the Pages project, add a CNAME
from `preview` to `ajay-guru-preview.pages.dev` at the nameservers, set the `PREVIEW_SITE`
repository variable, and change the one constant at the top of `scripts/share.mjs`. Cloudflare
Access can put a password in front of it.
