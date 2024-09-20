import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Ensure this is set to 0.0.0.0
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Split vendor chunk for node_modules
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the warning limit to 1000kB
  },
});
