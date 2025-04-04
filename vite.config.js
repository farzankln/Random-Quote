import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/",
  server: {
    proxy: {
      "/api/quote": {
        target: "http://api.quotable.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/quote/, "/random"),
      },
    },
  },
});
