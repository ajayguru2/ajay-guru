import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Thoughts: short living notes. A file starting with `_` is unpublished (no draft flag needed).
const thoughts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/thoughts" }),
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
    stack: z.string().array(),
    blurb: z.string() // one line for the home page
  })
});

export const collections = { thoughts, work };
