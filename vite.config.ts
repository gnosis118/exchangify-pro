import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // CRITICAL: Force absolute single React instance to prevent duplication
      "react": path.resolve(__dirname, "./node_modules/react/index.js"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom/index.js"),
      "react/jsx-runtime": path.resolve(__dirname, "./node_modules/react/jsx-runtime.js"),
      "react/jsx-dev-runtime": path.resolve(__dirname, "./node_modules/react/jsx-dev-runtime.js"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  optimizeDeps: {
    include: [
      "react", 
      "react-dom", 
      "react-router-dom", 
      "@tanstack/react-query",
      "react/jsx-runtime",
      "react/jsx-dev-runtime"
    ],
    force: true,
    esbuildOptions: {
      // Ensure consistent React module resolution
      mainFields: ['module', 'main'],
      conditions: ['import', 'module', 'default']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Remove React from manual chunking to prevent conflicts
          vendor: ['react-router-dom'],
          charts: ['recharts'],
          ui: ['@radix-ui/react-select', '@radix-ui/react-dialog', '@radix-ui/react-tabs'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: mode === 'development',
  },
}));