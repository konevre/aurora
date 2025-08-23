import { defineConfig } from "vitest/config";
import path from "path";

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
