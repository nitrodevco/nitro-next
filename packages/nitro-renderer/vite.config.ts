import path from 'node:path';

import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const r = (p: string) => path.resolve(__dirname, p);

export default defineConfig({
    build: {
        target: 'es2022',
        sourcemap: true,
        outDir: 'dist',
        emptyOutDir: true,
        lib: {
            entry: r('src/index.ts'),
            formats: ['es'],
            fileName: () => 'index.js',
        },
        rollupOptions: {
            external: ['pixi.js'],
            output: {
                manualChunks: id => {
                    if (id.includes('/packages/nitro-api/')) {
                        return 'nitro-api';
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
    plugins: [tsconfigPaths()],
    resolve: {
        dedupe: ['pixi.js'],
        alias: {
            '@nitrodevco/nitro-api': path.resolve(__dirname, '../nitro-api/src'),
            '@nitrodevco/nitro-shared': path.resolve(__dirname, '../nitro-shared/src'),
        },
    },
});
