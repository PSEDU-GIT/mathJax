import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    viteStaticCopy({
      targets: [{ src: "src/assets/fonts/*", dest: "assets/fonts" }],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "PseduMath",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
    assetsInlineLimit: 0,
  },
});
