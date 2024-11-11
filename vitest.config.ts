import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    inspectBrk: true,
    fileParallelism: false,
    browser: {
      name: "chromium",
      provider: "playwright",
    },
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/utils/test/setupTest.js", //'./로 시작하면 root에 생성 됨
    testTimeout: 10000,
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
