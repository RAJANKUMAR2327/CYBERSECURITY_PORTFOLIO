
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  test: {
    environment: "jsdom",

    globals: true,

    setupFiles: [
      "./src/test/setup.js"
    ],

    clearMocks: true,
    restoreMocks: true,

    include: [
      "**/*.{test,spec}.{js,jsx,ts,tsx}"
    ],

    exclude: [
      "node_modules",
      "dist"
    ],

    testTimeout: 10000
  }
});
