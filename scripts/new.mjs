#!/usr/bin/env node
// npm run new "Title of the thought" → src/content/thoughts/_<slug>.md
// The leading _ keeps it out of the published site; `npm run dev` and the preview site still show it.
import { existsSync, writeFileSync } from "node:fs";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('usage: npm run new "Title of the thought"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/['’]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const draft = `src/content/thoughts/_${slug}.md`;
const published = `src/content/thoughts/${slug}.md`;
for (const file of [draft, published]) {
  if (existsSync(file)) {
    console.error(`exists already: ${file}`);
    process.exit(1);
  }
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  draft,
  `---
title: "${title.replace(/"/g, '\\"')}"
date: ${today}
# summary: one line — it feeds <meta name=description> and the RSS entry, nothing else
# updated: set this when you tend the note; the lists sort by it
---

`
);

console.log(`${draft}

  npm run dev              # /thoughts/_${slug}/
  npm run share            # send someone the draft
  npm run publish ${slug}  # when it is ready`);
