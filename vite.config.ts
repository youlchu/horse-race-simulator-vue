import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue", "vue-router", "vuex"],
      dts: "src/auto-imports.d.ts",
    }),
    Components({
      dirs: ["src/shared/components", "src/components"],
      dts: "src/components.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
