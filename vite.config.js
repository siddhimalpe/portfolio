import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    {
      name: 'homepage-root-alias',
      closeBundle() {
        const outputDirectory = resolve(process.cwd(), 'dist');
        copyFileSync(
          resolve(outputDirectory, 'homepage.html'),
          resolve(outputDirectory, 'index.html'),
        );
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        homepage: resolve(process.cwd(), 'homepage.html'),
        aris: resolve(process.cwd(), 'aris.html'),
        brokeYaWoke: resolve(process.cwd(), 'broke-ya-woke.html'),
        nexus: resolve(process.cwd(), 'nexus.html'),
        together: resolve(process.cwd(), 'together.html'),
      },
    },
  },
});