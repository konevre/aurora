import cfg from "@aurora/eslint-config";
import next from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";

const nextCoreWebVitalsRules = next.configs?.["core-web-vitals"]?.rules ?? {};

export default [
    ...cfg.web,
    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            "@next/next": next,
            "react-hooks": reactHooks
        },
        rules: {
            ...nextCoreWebVitalsRules,
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn"
        }
    }
];
