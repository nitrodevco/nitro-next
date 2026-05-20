import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const r = (p: string) => path.resolve(__dirname, p);

export default defineConfig({
    build: {
        target: 'es2022',
        sourcemap: true,
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: id => {
                    if (id.includes('/packages/nitro-api/')) {
                        return 'nitro-api';
                    }
                    if (id.includes('/packages/nitro-renderer/')) {
                        return 'nitro-renderer';
                    }
                    if (id.includes('/packages/nitro-shared/')) {
                        return 'nitro-shared';
                    }
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
        },
    },
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    resolve: {
        dedupe: ['pixi.js'],
        alias: [{ find: /^#base\/(.*)/, replacement: r('src/$1') },
        { find: /^#themes\/(.*)/, replacement: r('themes/$1') },
        { find: '@nitrodevco/nitro-api', replacement: r('../nitro-api/src') },
        { find: '@nitrodevco/nitro-renderer', replacement: r('../nitro-renderer/src') },
        { find: '@nitrodevco/nitro-shared', replacement: r('../nitro-shared/src') }],
    },
    server: {
        port: 5173,
        strictPort: true,
        fs: {
            allow: [r('.'), r('..'), r('../..')],
        },
    },
});
