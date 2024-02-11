// vite.config.ts
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"), // 打包的入口文件
            name: "@kinda/utils", // 包名
            formats: ['es'], // 打包模式，默认是es和umd都打
            fileName: (format) => `index.${format}.js`,
        },
        outDir: "dist", // 打包后存放的目录文件
    },
});
