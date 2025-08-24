// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";

/**
 * Root ESLint config (flat config).
 * Used as base in monorepo.
 * Extended in apps/web and apps/api via local eslint.config.mjs.
 */
export default tseslint.config(
  {
    ignores: [
      "dist/",
      "node_modules/",
      ".turbo/",
      "coverage/",
      ".next/",
      "build/",
    ],
  },

  // Base JS rules
  eslint.configs.recommended,

  // Recommended TypeScript rules with type-checking
  ...tseslint.configs.recommendedTypeChecked,

  // Prettier (disables conflicting ESLint rules)
  prettierRecommended,

  {
    languageOptions: {
      parserOptions: {
        // projectService = true allows typescript-eslint
        // to automatically find tsconfig.* in the corresponding app/package
        projectService: true,
      },
    },

    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      // sorting imports/exports
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // side effects
            ["^\\u0000"],
            // node core & external packages (e.g. @nestjs/common)
            ["^node:", "^@?\\w"],
            // internal aliases (e.g. @/src/utils)
            ["^@/", "^src/"],
            // parent imports (e.g. @/src/utils/index.ts)
            ["^\\.\\.(?!/?$)", "^\\.\\./"],
            // relative imports (e.g. @/src/utils/index.ts)
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // styles (e.g. @/src/styles/index.scss)
            ["^.+\\.(?:css|scss|sass)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      
      // TS rules (minimum strictness)
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/await-thenable": "off",
    },
  }
);
