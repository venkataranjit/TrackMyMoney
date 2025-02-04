import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Track My Money",
        short_name: "Track My Money",
        description: "Track Your Daily Expenses",
        theme_color: "#17a2b8",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "any",
        icons: [
          {
            src: "./images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
