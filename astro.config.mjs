// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import astroD2 from "astro-d2";
import sitemap from "@astrojs/sitemap";

const font = (file) => `./src/assets/fonts/${file}`;

export default defineConfig({
  site: "https://ajay.guru",
  integrations: [
    astroD2({
      layout: "elk",
      pad: 24,
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
      defaultColor: false
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
