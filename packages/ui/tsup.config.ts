import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Output both formats for compatibility
  dts: true,              // Generate Type definitions (.d.ts)
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"], // ⚠️ IMPORTANT: Never bundle React in a UI lib
  // React 19 / Next.js "use client" support:
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";', 
    };
  },
});