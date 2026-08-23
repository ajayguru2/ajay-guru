import rss from "@astrojs/rss";
import { thoughts } from "../lib";

export async function GET(context) {
  const items = await thoughts();
  return rss({
    title: "Ajay Guru — Thoughts",
    description: "Short notes I keep tending. Newest change first.",
    site: context.site,
    items: items.map(({ id, data }) => ({
      title: data.title,
      pubDate: data.updated ?? data.date,
      description: data.summary,
      link: `/thoughts/${id}/`
    }))
  });
}
