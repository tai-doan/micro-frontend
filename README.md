# Khởi tạo các ứng dụgn
  - npm create vite@latest host-app -- --template react-ts
  - npm create vite@latest remote-app1 -- --template react-ts
  - npm create vite@latest remote-app2 -- --template react-ts

## Install package cần thiết ở các app
  - cd vô từng app và chạy lệnh dưới
  - yarn add antd && yarn add -D @originjs/vite-plugin-federation

## Cấu hình module:
<ol>
  <li>remote-app1/vite.config.js</li>

    ```js
      import { defineConfig } from 'vite';
      import react from '@vitejs/plugin-react';
      import federation from '@originjs/vite-plugin-federation';

      export default defineConfig({
        plugins: [
          react(),
          federation({
            name: 'remote_app1',
            filename: 'remoteEntry.js',
            exposes: {
              './App': './src/App.jsx',
            },
            shared: ['react', 'react-dom', 'antd'],
          }),
        ],
        server: {
          port: 3001,
        },
      });
    ```

  <li>remote-app2/vite.config.js</li>

    ```js
      import { defineConfig } from 'vite';
      import react from '@vitejs/plugin-react';
      import federation from '@originjs/vite-plugin-federation';

      export default defineConfig({
        plugins: [
          react(),
          federation({
            name: 'remote_app2',
            filename: 'remoteEntry.js',
            exposes: {
              './App': './src/App.jsx',
            },
            shared: ['react', 'react-dom', 'antd'],
          }),
        ],
        server: {
          port: 3002,
        },
      });
    ```

  <li>host-app/vite.config.js</li>

    ```js
      import { defineConfig } from 'vite';
      import react from '@vitejs/plugin-react';
      import federation from '@originjs/vite-plugin-federation';

      export default defineConfig({
        plugins: [
          react(),
          federation({
            name: 'host_app',
            remotes: {
              remote_app1: 'http://localhost:4173/assets/remoteEntry.js',
              remote_app2: 'http://localhost:4174/assets/remoteEntry.js',
            },
            shared: ['react', 'react-dom', 'antd'],
          }),
        ],
        server: {
          port: 3000,
        },
      });
    ```
</ol>

## Run source
  - Trong các application con chạy lệnh "yarn preview"
  - Trong application host chạy lệnh "yarn dev" sau khi chạy lên thì sẽ truy cập địa chỉ local port 3000 để sử dụng

## Lưu ý:
  - Dùng thêm zustand để share state giữa các host-app và remote-app
  - Khi run source thì chạy lệnh ==yarn build && yarn preview==