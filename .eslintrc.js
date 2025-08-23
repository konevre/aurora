module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ["eslint:recommended", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["@typescript-eslint", "prettier", "simple-import-sort"],
    rules: {
        // Prettier как источник правды по стилю (двойные кавычки и 4 пробела берутся из .prettierrc)
        "prettier/prettier": "error",

        // TS базовые
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "warn",

        // Сортировка импортов: сторонние → абсолютные алиасы → относительные (сначала родительские, потом соседние)
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
        "simple-import-sort/exports": "error"
    },
    ignorePatterns: ["dist/", "node_modules/", ".turbo/"]
};
