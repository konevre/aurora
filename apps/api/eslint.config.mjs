import cfg from "@aurora/eslint-config";

export default [
    ...cfg.api,
    {
        files: ["**/*.ts"],
        rules: {
            "@typescript-eslint/explicit-function-return-type": "off"
        },
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.eslint.json"]
            }
        }
    },
    {
        files: ["**/*.{spec,test}.{ts,tsx}", ".vitest.setup.ts"],
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: new URL(".", import.meta.url).pathname,
                projectService: false,
                project: ["./tsconfig.eslint.json"]
            }
        },
        rules: {
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/require-await": "off",
            "@typescript-eslint/no-floating-promises": "off",

            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/await-thenable": "off",

            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_"
                }
            ]
        }
    }
];
