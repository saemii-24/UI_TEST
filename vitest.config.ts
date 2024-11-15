import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": JSON.stringify({}),
  },
  test: {
    inspectBrk: true,
    fileParallelism: false,
    // browser: {
    //   enabled: false,
    //   provider: "playwright",
    //   name: "chromium",
    //   headless: false,
    // },

    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTest.js", //'./로 시작하면 root에 생성 됨
    testTimeout: 10000,
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
