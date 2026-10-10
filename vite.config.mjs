import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [
    react(),
    {
      name: "nonblocking-startup-styles",
      apply: "build",
      transformIndexHtml: {
        order: "post",
        handler(html) {
          // Inline loader can paint even while the main stylesheet / font imports download.
          return html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, (link) =>
            link.replace(/>$/, ' media="print" data-boot-style onload="this.media=\'all\'">'));
        },
      },
    },
  ],
});
