import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  // Stamped into the start screen. A browser tab that has been open across a
  // fix keeps serving the old module graph, and "have you reloaded" is not a
  // question anybody can answer honestly from memory — this makes it readable.
  define: { __BUILD_STAMP__: JSON.stringify(new Date().toISOString().slice(0, 16).replace('T', ' ')) },
  plugins: [
    {
      // The story frames this build from a file:// page, and a file:// document
      // has the opaque origin `null`. Two consequences, both handled here:
      //
      // 1. Chrome refuses module scripts there — they are fetched with CORS.
      //    The bundle is one file with no imports or exports, so it loads as a
      //    classic script just as well.
      // 2. A `<link rel="stylesheet" crossorigin>` is also a CORS request, and
      //    is refused outright. Losing the sheet is not cosmetic: without it
      //    the HUD is an unstyled column of text under the canvas, the
      //    subtitles sit a few thousand pixels below the fold, and the page
      //    scrolls. The sheet is inlined instead — no second request, nothing
      //    left to refuse, and no flash of unstyled interface either.
      name: 'file-protocol-bundle',
      apply: 'build',
      transformIndexHtml: {
        order: 'post',
        handler(html, ctx) {
          let out = html.replace(
            /<script([^>]*?)type="module"([^>]*?)src="([^"]*game\.js)"([^>]*)><\/script>/,
            '<script defer src="$3"></script>'
          );

          // Always drop the attribute, whether or not inlining below works.
          out = out.replace(/(<link[^>]*?)\scrossorigin(?=[\s>])/g, '$1');

          const bundle = ctx?.bundle ?? {};
          const cssFile = Object.values(bundle)
            .find((f) => f.type === 'asset' && f.fileName.endsWith('.css'));
          if (!cssFile) return out;

          const css = typeof cssFile.source === 'string'
            ? cssFile.source
            : Buffer.from(cssFile.source).toString('utf8');

          const inlined = out.replace(
            /<link[^>]*rel="stylesheet"[^>]*>/,
            () => `<style>\n${css}\n</style>`
          );
          if (inlined === out) return out;   // no link to replace; keep the file

          delete bundle[cssFile.fileName];
          return inlined;
        }
      }
    }
  ],
  build: {
    target: 'es2022',
    // Everything is inlined into one script and one sheet on purpose: the
    // build has to run from a file:// directory with no server behind it.
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    modulePreload: { polyfill: false },
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: 'game.js',
        assetFileNames: 'game.[ext]'
      }
    }
  },
  server: { port: 5173, strictPort: true }
});
