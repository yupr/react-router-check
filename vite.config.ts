/// <reference types="vitest" />
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // Vitestでのテスト実行時だけ、問題を引き起こす React Router のViteプラグインを無効化
    // https://github.com/remix-run/react-router/discussions/12655#discussioncomment-11720266
    !process.env.VITEST && reactRouter(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
  },
});
