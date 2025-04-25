import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite';

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
      name: 'remote_app1',
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
    port: 3001,
    cors: true,
  },
  server: {
    port: 3001,
    cors: true,
    hmr: true,
  },
});
