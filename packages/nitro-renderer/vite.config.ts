import path from 'node:path';

import { defineConfig } from 'vite';

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
            output: {
                manualChunks: (id, meta) => {
                    // Keep `import()` targets in their own chunk - see the same guard in
                    // packages/nitro-react/vite.config.ts for why folding one into the chunk
                    // that imports it deadlocks any top-level await on it.
                    if (meta.getModuleInfo(id)?.dynamicImporters?.length) return;

                    if (id.includes('/packages/nitro-api/')) {
                        return 'nitro-api';
                    }
                    if (id.includes('node_modules')) return 'vendor';
                },
            },
        },
    },
    plugins: [],
    resolve: {
        tsconfigPaths: true,
        dedupe: ['pixi.js'],
        alias: {
            '@nitrodevco/nitro-api': path.resolve(__dirname, '../nitro-api/src')
        },
    },
});
