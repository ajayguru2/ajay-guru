import { getCollection } from "astro:content";

// Newest change first: a tended note rises.
export async function thoughts() {
  const all = await getCollection("thoughts");
  return all.sort((a, b) => +(b.data.updated ?? b.data.date) - +(a.data.updated ?? a.data.date));
}

// Filename prefix is the order (01-, 02-, …).
export async function work() {
  const all = await getCollection("work");
  return all.sort((a, b) => a.id.localeCompare(b.id));
}

export const slug = (id: string) => id.replace(/^\d+-/, "");
