import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // hoặc host: '0.0.0.0'
  },
  build: {
    sourcemap: false, // Đảm bảo source map bị vô hiệu hóa
  },
});
