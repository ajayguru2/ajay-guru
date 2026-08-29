#!/usr/bin/env node
// npm run share — build the preview site from the working tree, drafts and all.
// It writes a commit straight from the files on disk, so nothing is staged, committed to your
// branch, or stashed. Your working tree is untouched.
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Flip this to https://preview.ajay.guru once that CNAME resolves (see README).
const PREVIEW_URL = process.env.PREVIEW_URL ?? "https://ajay-guru-preview.pages.dev";

const git = (args, env) =>
  execFileSync("git", args, { encoding: "utf8", env: { ...process.env, ...env } }).trim();

// A scratch index, seeded from the real one, so `git add -A` never touches what you have staged.
const index = join(mkdtempSync(join(tmpdir(), "ajay-guru-preview-")), "index");
copyFileSync(join(git(["rev-parse", "--absolute-git-dir"]), "index"), index);
const env = { GIT_INDEX_FILE: index };

git(["add", "-A"], env);
const tree = git(["write-tree"], env);
const commit = git(["commit-tree", tree, "-p", git(["rev-parse", "HEAD"]), "-m", "preview"]);

execFileSync("git", ["push", "--force", "origin", `${commit}:refs/heads/preview`], { stdio: "inherit" });
console.log(`\nBuilding. Live on ${PREVIEW_URL} in a minute or two — watch it with:\n\n  gh run watch\n`);
