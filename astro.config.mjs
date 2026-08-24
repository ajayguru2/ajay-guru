// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import astroD2 from "astro-d2";
import sitemap from "@astrojs/sitemap";

const font = (file) => `./src/assets/fonts/${file}`;

// The github themes were tuned for #fff / #24292e, not the paper tokens. These four
// tokens fall below the 4.5:1 floor (DESIGN.md §10) on --paper-2, so they are remapped
// warm: comments take the site's --muted values, keyword red and orange darken.
// Measured on #ede6d8 / #1f1b17: 4.75, 5.72, 4.98 / 6.16. Re-measure if edited.
const shikiRemap = {
  light: { "#6A737D": "#6b635a", "#D73A49": "#a02f38", "#E36209": "#9c4a00" },
  dark: { "#6A737D": "#a39a8c" }
};
const warmShikiTokens = {
  name: "warm-shiki-tokens",
  span(node) {
    const style = node.properties?.style;
    if (typeof style !== "string") return;
    node.properties.style = style.replace(
      /--shiki-(light|dark):(#[0-9A-Fa-f]{6})/g,
      (all, scheme, hex) => {
        const to = shikiRemap[scheme][hex.toUpperCase()];
        return to ? `--shiki-${scheme}:${to}` : all;
      }
    );
  }
};

export default defineConfig({
  site: "https://ajay.guru",
  integrations: [
    astroD2({
      layout: "elk",
      pad: 8, // just enough that 1px strokes don't clip; larger pads bake invisible margin into every figure gap
      // Colors come from src/content/thoughts/_theme.d2 (theme-overrides); these ids are the base.
      theme: { default: "1", dark: false }, // dark handled by CSS (see site.css, img[src^="/d2/"])
      // Build-time only: D2 subsets and embeds these into each SVG.
      fonts: {
        regular: "src/assets/fonts/IBMPlexMono-Regular.ttf",
        bold: "src/assets/fonts/IBMPlexMono-Medium.ttf",
        italic: "src/assets/fonts/IBMPlexMono-Italic.ttf"
      }
    }),
    sitemap()
  ],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
      transformers: [warmShikiTokens]
    }
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "IBM Plex Mono",
      cssVariable: "--font-mono",
      fallbacks: ["ui-monospace", "Menlo", "Consolas", "monospace"],
      options: {
        variants: [
          { src: [font("IBMPlexMono-400.woff2")], weight: 400, style: "normal" },
          { src: [font("IBMPlexMono-400-italic.woff2")], weight: 400, style: "italic" },
          { src: [font("IBMPlexMono-500.woff2")], weight: 500, style: "normal" }
        ]
      }
    }
  ]
});
