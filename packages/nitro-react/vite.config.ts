import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, Plugin } from 'vite';

const r = (p: string) => `${import.meta.dirname}/${p}`;

const tailwindAutoReference = (): Plugin => {
    const indexCss = path.resolve(r('./src/index.css'));

    return {
        name: 'tailwind-auto-reference',
        enforce: 'pre',
        transform(code, id) {
            const file = path.resolve(id.split('?')[0]);

            if (file === indexCss || !file.endsWith('.css') || !file.startsWith(path.resolve(r('./src/views'))) || /@reference\b/.test(code) || /@import\s+['"]tailwindcss['"]/.test(code)) return;

            const rel = path.relative(path.dirname(file), indexCss).replace(/\\/g, '/');

            return `@reference '${rel.startsWith('.') ? rel : './' + rel}';\n${code}`;
        },
    };
};

export default defineConfig({
    build: {
        target: 'baseline-widely-available',
        sourcemap: false,
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: id => {
                    if (id.includes('/packages/nitro-api/')) {
                        return 'nitro-api';
                    }
                    if (id.includes('/packages/nitro-packets/')) {
                        return 'nitro-packets';
                    }
                    if (id.includes('/packages/nitro-renderer/')) {
                        return 'nitro-renderer';
                    }
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
        },
    },
    plugins: [
        tailwindAutoReference(),
        react(),
        babel({
            plugins: ['babel-plugin-react-compiler'],
        }),
        tailwindcss(),
    ],
    resolve: {
        tsconfigPaths: true,
        dedupe: ['pixi.js'],
        alias: [
            { find: /^#base\/(.*)/, replacement: r('src/$1') },
            { find: /^#themes\/(.*)/, replacement: r('themes/$1') },
            { find: '@nitrodevco/nitro-api', replacement: r('../nitro-api/src') },
            {
                find: '@nitrodevco/nitro-renderer',
                replacement: r('../nitro-renderer/src'),
            },
            { find: '@nitrodevco/nitro-packets', replacement: r('../nitro-packets/src') }
        ],
    },
    server: {
        port: 5173,
        strictPort: true,
        fs: {
            allow: [r('.'), r('..'), r('../..')],
        },
    },
});
