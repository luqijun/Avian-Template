import { defineConfig } from "vite";
import alias from "@rollup/plugin-alias";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dtsPlugin from "vite-plugin-dts";

const rootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({

  build: {
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    lib: {
      name: "avian",
      entry: resolve(__dirname, "src/main.ts")
    }
  },
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    alias(),
    dtsPlugin({
      outDir: ["dist/"],
      include: ["packages/**/*.ts"]
    })
  ],
  resolve: {
    alias: {
      "@src": resolve(rootDir, "src"),
      "@custom_types": resolve(rootDir, "src/@custom_types"),
    },
  },
});
