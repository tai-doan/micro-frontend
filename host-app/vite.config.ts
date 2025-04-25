import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    react(),
    federation({
      name: 'host_app',
      remotes: {
        remote_app1: 'http://localhost:3001/assets/remoteEntry.js',
        remote_app2: 'http://localhost:3002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'antd'],
    }),
  ],
  preview: {
    port: 3000,
    cors: true,
  },
  server: {
    port: 3000,
    cors: true,
    hmr: true,
  },
});
