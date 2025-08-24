// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

/**
 * BASE preset — common for all packages/apps.
 * We don't bind browser/node globals — this is done by web/api‑presets.
 */
export const base = tseslint.config(
    {
        ignores: [
            "dist/",
            "build/",
            ".next/",
            "coverage/",
            ".turbo/",
            "node_modules/",
            "**/*.d.ts"
        ]
    },
    ...tseslint.configs.recommendedTypeChecked,
    prettierRecommended,
    {
        languageOptions: {
            parserOptions: { projectService: true }
        },
        plugins: { "simple-import-sort": simpleImportSort },
        rules: {
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        ["^\\u0000"],
                        ["^node:", "^@?\\w"],
                        ["^@/", "^src/"],
                        ["^\\.\\.(?!/?$)", "^\\.\\./"],
                        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                        ["^.+\\.(?:css|scss|sass)$"]
                    ]
                }
            ],
            "simple-import-sort/exports": "error",

            "@typescript-eslint/consistent-type-imports": [
                "warn",
                { prefer: "type-imports" }
            ],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-floating-promises": "warn",
            "@typescript-eslint/no-unsafe-argument": "warn",
            "@typescript-eslint/ban-ts-comment": [
                "warn",
                { "ts-ignore": "allow-with-description" }
            ],
            "@typescript-eslint/no-non-null-assertion": "warn"
        }
    },
    {
        files: ["**/*.config.{js,cjs,mjs,ts}", "**/scripts/**/*.{js,ts}"],
        languageOptions: {
            globals: globals.node,
            sourceType: "module"
        }
    }
);

/**
 * WEB preset — adds browser‑globals and .tsx.
 * React/Next plugins are connected in the application itself (see example below).
 */
export const web = [
    ...base,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parserOptions: { projectService: true },
            globals: globals.browser
        },
        rules: {
            // here are only basic web‑details; next/react rules — at the app level
        }
    }
];

/**
 * API preset — Node/Nest.
 */
export const api = [
    ...base,
    {
        files: ["**/*.ts"],
        languageOptions: {
            parserOptions: { projectService: true },
            globals: globals.node
        },
        rules: {
            "@typescript-eslint/no-misused-promises": [
                "error",
                { checksVoidReturn: { attributes: false } }
            ]
        }
    },
    // soften tests rules
    {
        files: ["**/*.{spec,test}.ts"],
        rules: {
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-non-null-assertion": "off"
        }
    }
];

export default { base, web, api };
