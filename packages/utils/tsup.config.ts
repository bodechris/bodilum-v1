import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Dual format for frontend and backend compatibility
  dts: true,              // Generate .d.ts types
  splitting: false,
  sourcemap: true,
  clean: true,
});