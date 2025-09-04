import { defineConfig } from "vitest/config";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    !process.env.VITEST && reactRouter(),
    tsconfigPaths(),
  ],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./app/test/setup.tsx",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text-summary", "html"],
      enabled: true,
      include: ["app/**/*.{ts,tsx}"],
      exclude: [
        "app/**/*.spec.{js,ts}",
        "app/**/*.test.{js,ts}",
        "app/**/*.d.ts",
        "app/test/*.ts",
        "app/routes.ts",
        "app/root.tsx",
        "app/components/ui",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
