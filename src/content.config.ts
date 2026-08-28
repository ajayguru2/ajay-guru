import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// A file starting with `_` is unpublished (no draft flag needed). It is still built by `astro dev`
// and by the preview site (DRAFTS=1) so a draft can be read and shared before it goes live.
const drafts = import.meta.env.DEV || process.env.DRAFTS === "1";

// Thoughts: short living notes.
const thoughts = defineCollection({
  loader: glob({ pattern: drafts ? "**/*.md" : "**/[^_]*.md", base: "./src/content/thoughts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    summary: z.string().optional() // used for <meta description> and RSS only
  })
});

// Work: one file per system, sorted by filename prefix (01-, 02-, …).
const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(), // the system, not the employer
    byline: z.string(), // "Org · Role · Period"
    blurb: z.string() // one line for the home page
  })
});

export const collections = { thoughts, work };
