# ajay.guru — design language

This is the reference for how the site looks, reads and is built, and the rules for adding to it. Everything here is already implemented; when the two disagree, fix the code or update this file — do not let them drift.

The short version: **an engineer's notebook, typeset with care.** One monospace family, paper and ink, hairline rules, a single narrow column, no decoration. Diagrams are first-class. Nothing moves, nothing loads that is not text.

---

## 1. Principles

1. **Prose over props.** No logos, skill bars, cards, icons, badges, stats, avatars or illustrations. If something is worth saying, say it in a sentence.
2. **One column, one width.** Everything lives in a 680 px measure. Figures may not exceed it; nothing else may either.
3. **Zero client JavaScript.** The only script on the site is the theme switch (≈12 lines). A feature that needs JS needs a very good reason and a line in the colophon.
4. **Deterministic, self-contained builds.** No network at build time beyond `npm ci` and the D2 install. No CDN fonts, no analytics, no embeds. Building twice yields byte-identical output.
5. **Delete before adding.** Prefer removing an element to styling it. Every new thing must earn its rule in `site.css`.
6. **Respect the reader's settings.** Colour scheme follows the OS unless the reader overrides it. Print works. Keyboard works. Reduced motion is moot because nothing moves.

---

## 2. Voice

- First person, present tense, plain. Short sentences. Concrete nouns. No marketing adjectives.
- Titles are **claims or systems, not categories**: "Review the plan, not the diff", "Turning recipes into machine instructions" — never "Blog post #3" or "Nymble".
- Work entries answer four things in order: context · what I did · what was hard · outcome. The employer is a byline, not a heading.
- Thoughts are living notes, not posts: no read time, no hero image, no "in this article". They carry a `date` and, when revisited, an `updated` date shown as "tended".
- Typography of text: curly quotes (“ ” ‘ ’), en dash for ranges (2020 – 2021), em dash for asides (—), middle dot for bylines (Org · Role · Period).
- Facts only you know are marked in copy as `<span class="todo">[TODO: …]</span>` until filled; `grep -rn TODO src` must be empty before a deploy.

---

## 3. Typography

One family: **IBM Plex Mono**, self-hosted as three static woff2 files (400, 400 italic, 500), served through Astro's Fonts API (`astro.config.mjs → fonts`) with metric-matched fallbacks `ui-monospace, Menlo, Consolas, monospace`. Diagrams embed the same face (TTFs in `src/assets/fonts/`, build-time only).

Weights: 400 for everything; 500 for headings, the masthead name and `strong`. Diagram shape labels are explicitly *not* bold. Italic only for `em` and diagram edge labels. No 600/700.

| Role | Size | Line height | Notes |
|---|---|---|---|
| Body / prose | `clamp(0.9375rem, 0.875rem + 0.3vw, 1.0625rem)` (15–17 px) | 1.6 | ≈66–70 characters per line at 680 px |
| Home statement | `clamp(1.25rem, 0.95rem + 1.1vw, 1.5rem)` (20–24 px) | 1.45 | weight 400 |
| Page title (h1) | `clamp(1.5rem, 1.2rem + 1.2vw, 2rem)` (24–32 px) | 1.2 | weight 500 |
| Work entry h2 | `clamp(1.125rem, 1rem + 0.6vw, 1.375rem)` (18–22 px) | 1.3 | weight 500 |
| Prose h2 / h3 | 1.125em / 1em of body | 1.25 | weight 500; markdown bodies start at `##` |
| List titles (home, thoughts) | 1.0625–1.125em of body | 1.35–1.4 | weight 400 home, 500 index |
| Masthead name | 1.125rem | — | weight 500; h1 only on the home page |
| Nav, bylines, metadata, captions, footer | 0.8125rem (13 px) | 1.5–1.6 | colour `--muted`; never smaller than 13 px |
| Section label | 0.75rem, uppercase, `letter-spacing: 0.12em` | — | `--muted`, above a hairline rule |
| Code blocks | 0.875rem | 1.6 | on `--paper-2`, `tab-size: 2`, scrolls horizontally |
| Inline code | 0.95em | — | on `--paper-2`, 2 px radius |
| Diagram labels | 14 (shapes, via the fence glob); edge labels keep D2's 16 unless set | — | see §7 |

No letter-spacing on headings; no negative tracking anywhere; `text-wrap: balance` on headings, `pretty` on paragraphs.

Prose subheads and list titles are sized in `em` so they track the fluid body — a heading must never render smaller than the text it heads. (The body clamp reaches 17 px on desktop; fixed-rem subheads used to fall below it.)

---

## 4. Colour

Six tokens, defined once with `light-dark()`; `color-scheme` picks the side.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--paper` | `#f6f1e7` | `#15130f` | page background |
| `--paper-2` | `#ede6d8` | `#1f1b17` | code, inline code, diagram shape fill, `:target` highlight |
| `--ink` | `#1a1613` | `#e6e0d4` | text, rules in tables' head, diagram strokes |
| `--muted` | `#6b635a` | `#a39a8c` | metadata, nav, captions, footnotes, secondary prose |
| `--accent` | `#7a2e2a` | `#d9907f` | prose underlines, hover, footnote marks, TODO markers — nothing else |
| `--rule` | `#d6cdbd` | `#332d26` | hairlines |

Contrast on paper: ink 16.0 / 14.1, muted 5.2 / 6.7, accent 8.3 / 7.3 (light / dark) — all AA for body text. Re-measure if you change a token.

Rules: no other colours in the stylesheet; no gradients, shadows, tints, borders thicker than 1 px, or rounded corners beyond 2 px. Shiki themes are `github-light` / `github-dark` with their backgrounds overridden to `--paper-2`, and the tokens that fall under the 4.5:1 floor on `--paper-2` remapped warm by a small transformer in `astro.config.mjs` (comments take `--muted`; keyword red and orange darken). Re-measure there if you change a theme or a paper token.

**Scheme switching.** Default follows `prefers-color-scheme`. `<html data-theme="light|dark">` overrides it; the value is stored in `localStorage.theme`, applied by a 3-line inline script in `<head>` before first paint, toggled by the masthead button whose label names the theme you would switch *to*. There is no "auto" state in the UI; clearing site data restores it. Print forces light with pure black/white tokens.

---

## 5. Layout and spacing

- Column: `.wrap { width: min(42.5rem, 100% - 2.5rem); margin-inline: auto }` — 680 px, 20 px gutters on phones.
- Masthead: name left, nav right (Work · Thoughts · About · theme button), baseline-aligned, `padding-top: clamp(1.5rem, 4vw, 3rem)`. The current section is `--ink`, others `--muted`.
- Rhythm (all `clamp()`, shrinking ≈×0.6 on phones):
  - masthead → lead: `clamp(4rem, 9vw, 7.5rem)`; masthead → page title: `clamp(3.5rem, 8vw, 6rem)`
  - between sections: `clamp(4.5rem, 10vw, 7rem)`
  - section label rule → first item: 1.75–2.5rem; list rows: 0.875rem padding (home) / 1.375rem (index), 1 px `--rule` between
  - work entries on `/work`: `clamp(3.5rem, 8vw, 5.5rem)` apart, each opening with a hairline
  - footer: `clamp(5.5rem, 12vw, 8rem)` above, hairline, 1.25rem inside
- Sibling groups (nav, footer links, lists) are flex with `gap`, never margins between siblings.
- Hit targets: nav and footer links are ≥ 44 px tall.
- Nothing is fixed, sticky, absolutely positioned or animated, except the skip link when focused.

---

## 6. Components (the complete set)

All live in `src/components/` or as classes in `src/styles/site.css`. Do not add a component for a one-off; add a class, and only if an existing one does not fit.

| Thing | Where | Notes |
|---|---|---|
| `Base.astro` | layout | head meta (title template "X — Ajay Guru", description, canonical, OG/Twitter with `/og.png`, `rel=me`, RSS + sitemap links, icons, theme-color ×2, color-scheme), skip link, masthead, `<main id="main" tabindex="-1">`, footer, the two inline scripts |
| `ThoughtList.astro` | component | rows of title + date ("tended Mon YYYY" if updated); `full` adds summary and bigger rows |
| `.lead` | class | home statement + sub line |
| `.page-title` | class | h1 + optional `.sub` |
| `.section` + `.section-head` | class | hairline, uppercase label left, "All … →" link right |
| `.work-list` | class | home: h2 link + byline + blurb |
| `.work-entry` | class | `/work`: h2, byline, `.prose` body, stack line |
| `.prose` | class | markdown bodies and About; see §8 |
| `footer.site` | element | GitHub · LinkedIn · X · email · RSS, then the colophon |
| `.mono`, `.label`, `.todo` | utilities | the only utilities |

Footer colophon must stay true: "Set in IBM Plex Mono. Built with Astro; diagrams drawn in D2 at build time. The only JavaScript is the theme switch." Update it if any of that changes.

---

## 7. Diagrams (D2)

Diagrams are the one place the site gets visual, so they follow the same rules as the type.

- Write them as ```` ```d2 ```` fences in Markdown. astro-d2 renders them at build time with the D2 binary (v0.8.1, ELK layout, pad 24) to `public/d2/<path>-N.svg` and emits `<img alt width height loading=lazy>`. `public/d2/` is build output and git-ignored.
- **Every fence starts with two lines** that pull in the site's palette and font and turn off D2's defaults:
  ```d2
  ...@_theme.d2
  *.style: {bold: false; stroke-width: 1; font-size: 14}
  ```
  `src/content/thoughts/_theme.d2` maps D2's N/B/AA colour slots to the six tokens and sets a transparent background. It affects only top-level shapes; nest shapes only if you restyle them.
- **Every fence has a title**: ```` ```d2 title="One sentence saying what the chart shows" ````. It becomes the `alt`. `grep -rn '^```d2$' src/content` must return nothing.
- Wrap a diagram in `<figure> … <figcaption>…</figcaption></figure>` (blank lines around the fence) when a caption helps. Captions are 13 px mono, muted, centred.
- Size: **≤ 680 px wide**; prefer `direction: down` for long flows; keep labels ≥ 13 px (shape labels are 14 via the glob; to shrink edge labels add `(* -> *)[*].style.font-size: 13`). A diagram must still read at 390 px (it scales to the column).
- Look: 1 px ink strokes, `--paper-2` fills, no bold labels, edge labels italic muted, dashed for loops/optional edges (`style.stroke-dash: 4`). No colour beyond the tokens, no icons, no sketch mode, no shadows.
- Dark mode: D2 renders light only (`theme.dark: false`); the page applies `filter: invert(1) hue-rotate(180deg)` to `img[src^="/d2/"]` when the scheme is dark. That lands within a few units of the dark tokens. If exact colour ever matters, the upgrade path is astro-d2's `inline: true` + a CSS remap of D2's `.fill-*/.stroke-*` classes — but note its inline path currently drops the alt text and size for D2 ≥ 0.7.

---

## 8. Prose (Markdown conventions)

- Headings inside a thought or work body start at `##`; never use `#`.
- Paragraph spacing is `1.15em`; h2 sits `2.25em` below the previous block.
- Links are underlined in `--accent` (`text-underline-offset: 0.15em`, 1 px). External links print their URL after the text.
- Tables: header row in 12 px uppercase mono with a 1 px ink rule; body rows separated by `--rule`; wide tables scroll inside their box.
- Footnotes use Markdown `[^1]`; they render small and muted under a hairline, the target note highlights on `--paper-2`.
- Code blocks: fenced with a language; no line numbers, no titles, no highlight lines.
- Images other than diagrams: avoid. If unavoidable, `max-width: 100%`, no border, a caption.
- No emoji, no HTML beyond `<figure>`/`<figcaption>` and the TODO span.

---

## 9. Content model

```
src/content/thoughts/<slug>.md     title, date, updated?, summary?   ·  `_`-prefixed file = unpublished
src/content/work/NN-<name>.md      title (the system), byline, stack[], blurb (one line for home)
src/content/thoughts/_theme.d2     shared diagram palette
```

- Thoughts list by `updated ?? date`, newest first, everywhere (home shows 5, index shows all). `summary` feeds `<meta name=description>` and RSS only.
- Work order is the filename prefix. `/work#<name>` is the anchor the home page links to.
- About is a page, not content: `src/pages/about.astro`. Keep it: who (2–3 sentences) · Now (dated) · How I work · On the side · Toolbox + one education clause.
- Do not add tags, categories, reading time, authors, hero images, related posts or comments. Add a field only when a page needs to render it.

---

## 10. Accessibility and performance floor

- One `<h1>` per page (home: the name; elsewhere: the page/thought title).
- Skip link → `#main`; visible focus ring (`2px solid currentColor`, 3 px offset) on everything; `[id] { scroll-margin-top: 2rem }`.
- All text ≥ 13 px, all colour pairs ≥ 4.5:1; links are underlined in prose, never colour-only.
- Diagrams have alt text; footnotes have back links; the footnotes heading is visually hidden, not removed.
- Fonts: ≈32 KB total, preloaded, `font-display: swap` with metric fallbacks. A page is a few KB of HTML + CSS; a diagram SVG is ~20–35 KB.
- `grep -rho '<script[^>]*>' dist | sort -u` must show only the two theme-switch scripts.

---

## 11. Adding things — checklist

1. Can it be content instead of code? A new thought, a new work entry, a new paragraph on About.
2. Can an existing class carry it? Reuse `.section`, `.prose`, `.mono`, `.label`, `ThoughtList`.
3. If it needs a new class: tokens only, fluid sizes via `clamp()`, flex + `gap`, no fixed widths, works at 390 px, works in print, works in both schemes.
4. If it needs JavaScript: stop. Ask whether it is worth breaking the colophon.
5. If it needs a dependency: stop. Check the standard library, the platform, then Astro.
6. Run the floor: `npm run build`; zero new `<script>`; every D2 fence titled; no `TODO` in `src`; build twice and `diff -r` the two `dist/`.
7. Update this file if you changed a rule, a token, or a component.

---

## 12. Decisions and why (so they are not re-litigated)

- **Monospace everywhere.** Ajay's call after seeing a serif build; it reads as a notebook and makes code, diagrams and prose one voice. Sizes were retuned down for the wider glyphs.
- **Editorial layout, not a mono-led "terminal" layout.** Single column, generous rhythm, hairlines — the grid of a well-set page carrying monospace type.
- **D2 binary, not D2.js.** D2.js hangs `astro build` (worker thread never exits) and was experimental; the binary is pinned in CI via `install.sh --version v0.8.1`.
- **`<img>` diagrams + filter for dark, not inline SVG.** Keeps alt text, intrinsic size and caching; inline mode in astro-d2 0.13 loses alt/size for D2 ≥ 0.7.
- **Theme button with `localStorage`, not OS-only.** OS-only was the first cut; a toggle was requested. Kept to two states and ~12 lines of inline JS.
- **No résumé, no phone, no talks/Medium links, no socials beyond GitHub · LinkedIn · X · email.** Decided at the redesign; the Thoughts section replaces earlier writing.
- **No year in the copyright line.** Keeps the build deterministic across New Year.
- **Static font cuts, not the variable family.** A quarter of the bytes; no axis the site uses.
