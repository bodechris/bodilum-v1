import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Or src/server.ts, whatever your entry file is
  format: ["cjs"],         // Node.js on EC2 runs CommonJS best
  target: "node18",        // Adjust to your EC2 Node version
  clean: true,
  sourcemap: true,
  noExternal: [/(.*)/],    // ⚠️ BUNDLES ALL NODE_MODULES INTO ONE FILE
});