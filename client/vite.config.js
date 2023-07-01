import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-chartjs-2$": "react-chartjs-2/dist/index.esm.js",
    },
  },
});
