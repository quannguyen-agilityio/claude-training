import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, './src/assets'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components'),
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, './src/constants'),
      },
      {
        find: '@enums',
        replacement: path.resolve(__dirname, './src/enums'),
      },
      {
        find: '@helpers',
        replacement: path.resolve(__dirname, './src/helpers'),
      },
      {
        find: '@layouts',
        replacement: path.resolve(__dirname, './src/layouts'),
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, './src/pages'),
      },
      {
        find: '@services',
        replacement: path.resolve(__dirname, './src/services'),
      },
      {
        find: '@stores',
        replacement: path.resolve(__dirname, './src/stores'),
      },
    ],
  },
  plugins: [react(), EnvironmentPlugin('all')],
});
