// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Force-enable nitro with the node-server preset so `npm run build` emits a real
  // runnable Node HTTP server (dist/server/index.mjs) for our VPS deploy, instead of
  // the bare Web-standard fetch handler nitro produces when skipped outside Lovable's cloud.
  nitro: {
    preset: "node-server",
    output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
  },
});
