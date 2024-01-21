import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: 'localhost',
    port: 4300,
    proxy: {
      '/demo': {
        target: 'https://demo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/demo/, ''),
      },
    },
  },
  envDir: './environments',
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
}));
