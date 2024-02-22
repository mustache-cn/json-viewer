import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist", // 输出目录
    emptyOutDir: true, // 清空输出目录
    rollupOptions: {
      input: {
        "content-script": "./src/content-script/content-script.ts",
        background: "./src/content-script/background.ts",
        popup: "./src/content-script/popup.ts",
      }, // 入口文件
      output: {
        entryFileNames: "content-script/[name].js",
      },
    },
  },
  publicDir: "public",
});
