import rss from "@astrojs/rss";
import { thoughts } from "../lib";

export async function GET(context) {
  const items = (await thoughts()).filter(({ id }) => !id.startsWith("_"));
  return rss({
    title: "Ajay Guru — Thoughts",
    description: "Notes I keep returning to, most recently tended first.",
    site: context.site,
    items: items.map(({ id, data }) => ({
      title: data.title,
      pubDate: data.updated ?? data.date,
      description: data.summary,
      link: `/thoughts/${id}/`
    }))
  });
}
