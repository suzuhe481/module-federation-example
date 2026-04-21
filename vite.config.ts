import { defineConfig } from "vite";
import { withZephyr } from "vite-plugin-zephyr";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    withZephyr({
      mfConfig: {
        name: "module-federation-example",
        filename: "remoteEntry.js",
        remotes: {
          "profile-section": {
            type: "module",
            name: "profile-section",
            entry: "http://localhost:5174/remoteEntry.js",
          },
        },
        exposes: {
          "./AlertDialog": "./src/components/ui/alert-dialog",
          "./Button": "./src/components/ui/button",
          "./Input": "./src/components/ui/input",
          "./Label": "./src/components/ui/label",
          "./RadioGroup": "./src/components/ui/radio-group",
          "./Separator": "./src/components/ui/separator",
          "./Sheet": "./src/components/ui/sheet",
          "./Skeleton": "./src/components/ui/skeleton",
          "./utils": "./src/lib/utils",
        },
        dts: {
          tsConfigPath: "./tsconfig.app.json",
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
          zustand: { singleton: true },
          "tailwind-merge": {},
          clsx: {},
          motion: {},
          "lucide-react": {},
          "class-variance-authority": {},
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: false, // Prevents infinite refresh
  },
});
