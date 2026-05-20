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
            external: ['pixi.js'],
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
        alias: {
            '#base': r('base'),
            '#themes': r('themes'),
            '@nitrodevco/nitro-api': path.resolve(__dirname, '../nitro-api/src'),
            '@nitrodevco/nitro-renderer': path.resolve(__dirname, '../nitro-renderer/src'),
            '@nitrodevco/nitro-shared': path.resolve(__dirname, '../nitro-shared/src'),
        },
    },
    server: {
        port: 5173,
        strictPort: true,
        fs: {
            allow: [r('.'), r('..'), r('../..')],
        },
    },
});
