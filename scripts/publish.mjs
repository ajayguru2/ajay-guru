#!/usr/bin/env node
// npm run publish [slug …] — drop the _ from the named drafts, commit src/content, push to main.
// Content only. Code changes still go through a normal commit, so a typo fix can never carry a
// half-finished component with it.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const out = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const git = (...args) => execFileSync("git", args, { stdio: "inherit" });

const branch = out("rev-parse", "--abbrev-ref", "HEAD");
if (branch !== "main") {
  console.error(`on "${branch}". Publishing deploys, so it runs from main:\n\n  git switch main\n`);
  process.exit(1);
}

const slugs = process.argv.slice(2).map((s) => s.replace(/^_/, "").replace(/\.md$/, ""));
for (const slug of slugs) {
  const draft = `src/content/thoughts/_${slug}.md`;
  const published = `src/content/thoughts/${slug}.md`;
  if (existsSync(draft)) git("mv", draft, published);
  else if (existsSync(published)) console.log(`${slug}: already published — picking up the edits`);
  else {
    console.error(`no thought called "${slug}" in src/content/thoughts/`);
    process.exit(1);
  }
}

git("add", "src/content");
const staged = out("diff", "--cached", "--name-only");
if (!staged) {
  console.log("nothing to publish — src/content is unchanged");
  process.exit(0);
}

const files = staged.split("\n");
console.log(`\n${files.map((f) => `  ${f}`).join("\n")}\n`);
const message = slugs.length
  ? `Publish: ${slugs.join(", ")}`
  : files.length === 1
    ? `Edit ${files[0].replace("src/content/", "")}`
    : `Edit ${files.length} content files`;

git("commit", "-m", message);
git("push", "origin", "main");
console.log(`\nBuilding. Live on https://ajay.guru in a minute or two — watch it with:\n\n  gh run watch\n`);
