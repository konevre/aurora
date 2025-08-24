import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        globals: true,
        include: ["src/**/tests/**/*.spec.ts"],
        setupFiles: [".vitest.setup.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "html", "lcov"],
            reportsDirectory: "./coverage"
        }
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src")
        }
    }
});
