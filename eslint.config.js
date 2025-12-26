// eslint.config.js
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import parserVue from "vue-eslint-parser";
import configPrettier from "eslint-config-prettier";
import parserTypeScript from "@typescript-eslint/parser";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  js.configs.recommended,

  ...pluginVue.configs["flat/essential"],

  {
    name: "app/vue-rules",
    files: ["**/*.vue"],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: parserTypeScript,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ref: "readonly",
        computed: "readonly",
        reactive: "readonly",
        watch: "readonly",
        watchEffect: "readonly",
        watchPostEffect: "readonly",
        watchSyncEffect: "readonly",
        onMounted: "readonly",
        onUnmounted: "readonly",
        onBeforeMount: "readonly",
        onBeforeUnmount: "readonly",
        onBeforeUpdate: "readonly",
        onUpdated: "readonly",
        onActivated: "readonly",
        onDeactivated: "readonly",
        nextTick: "readonly",
        provide: "readonly",
        inject: "readonly",
        toRefs: "readonly",
        toRef: "readonly",
        useStore: "readonly",
        createStore: "readonly",
        useRouter: "readonly",
        useRoute: "readonly",
        Ref: "readonly",
        ComputedRef: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript,
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/valid-template-root": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  {
    name: "app/typescript-rules",
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ref: "readonly",
        computed: "readonly",
        reactive: "readonly",
        watch: "readonly",
        watchEffect: "readonly",
        watchPostEffect: "readonly",
        watchSyncEffect: "readonly",
        onMounted: "readonly",
        onUnmounted: "readonly",
        onBeforeMount: "readonly",
        onBeforeUnmount: "readonly",
        onBeforeUpdate: "readonly",
        onUpdated: "readonly",
        nextTick: "readonly",
        provide: "readonly",
        inject: "readonly",
        toRefs: "readonly",
        toRef: "readonly",
        useStore: "readonly",
        createStore: "readonly",
        useRouter: "readonly",
        useRoute: "readonly",
        Ref: "readonly",
        ComputedRef: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript,
    },
    rules: {
      ...pluginTypeScript.configs.recommended.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  configPrettier,
];
