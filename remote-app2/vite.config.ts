import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  plugins: [
    react(),
    federation({
      name: 'remote_app2',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx',
      },
      remotes: {
        host: 'http://localhost:3000/assets/remoteEntry.js', // URL của host-app
      },
      shared: [
        'react',
        'react-dom',
        'antd',
        'zustand',
      ],
    }),
  ],
  preview: {
    port: 3002,
    cors: true,
  },
  server: {
    port: 3002,
    cors: true,
    hmr: true,
  },
});
