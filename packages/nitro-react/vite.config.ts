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

/**
 * Dev-server speed. The workspace packages resolve to their TypeScript sources, so by default
 * the unbundled dev server sends every one of their modules to the browser individually -
 * roughly 2,400 requests before the first frame (nitro-packets alone is 1,100 files behind one
 * barrel). Two opt-in modes trade hot reload of those packages for a fast first load:
 *
 * - `yarn dev:prebundle` (`--mode prebundle`): pre-bundle `@nitrodevco/*` with the dependency
 *   optimizer, the way node_modules packages are. The app keeps full HMR; a change inside
 *   nitro-renderer / nitro-packets / nitro-api needs a restart (`--force` re-optimizes).
 * - `yarn dev:bundled` (`--mode bundled`): Vite 8's experimental full-bundle dev mode - the
 *   whole app is bundled by rolldown and served from memory, with HMR. Fastest cold load.
 *
 * Either way the React Compiler only runs on this package's sources: the others have no
 * components, and compiling them was pure transform cost on every file.
 */
const WORKSPACE_PACKAGES = [ '@nitrodevco/nitro-api', '@nitrodevco/nitro-packets', '@nitrodevco/nitro-renderer' ];

export default defineConfig(({ mode }) => {
    const prebundleWorkspace = mode === 'prebundle';
    const bundledDev = mode === 'bundled';

    return {
    experimental: {
        bundledDev,
    },
    optimizeDeps: {
        include: prebundleWorkspace ? WORKSPACE_PACKAGES : [],
    },
    build: {
        target: 'baseline-widely-available',
        sourcemap: false,
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: (id, meta) => {
                    // A module that something `import()`s has to keep a chunk of its own. Folding
                    // it into the chunk that imports it turns that `import()` into a self-import -
                    // a promise that only settles once the importing chunk has finished evaluating -
                    // so any top-level await on it deadlocks: the chunk never finishes, nothing
                    // downstream of it ever evaluates, and the browser reports nothing at all.
                    // `truffle-text` top-level awaits `initFreeType()`, which `import()`s the
                    // FreeType Emscripten module, and the blanket `node_modules -> vendor` rule
                    // below used to put both sides in `vendor`. That deadlock is what left the
                    // production build a silent black screen while dev (unbundled) was fine.
                    if (meta.getModuleInfo(id)?.dynamicImporters?.length) return;

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
                        if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) {
                            return 'react-vendor';
                        }

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
            // Replaces the plugin's default (every script file anywhere), so it has to keep
            // the script-extension part of that default - without it babel is handed CSS too.
            include: [ /[\\/]packages[\\/]nitro-react[\\/]src[\\/].*\.(?:[jt]sx?|[cm][jt]s)(?:$|\?)/ ],
        }),
        tailwindcss(),
    ],
    resolve: {
        tsconfigPaths: true,
        dedupe: ['pixi.js'],
        alias: [
            { find: /^#base\/(.*)/, replacement: r('src/$1') },
            { find: /^#themes\/(.*)/, replacement: r('themes/$1') },
            // Pre-bundling needs the packages reached as bare imports (their `exports` already
            // point at the sources); the aliases are for the plain source-served mode.
            ...(prebundleWorkspace
                ? []
                : [
                        { find: '@nitrodevco/nitro-api', replacement: r('../nitro-api/src') },
                        { find: '@nitrodevco/nitro-renderer', replacement: r('../nitro-renderer/src') },
                        { find: '@nitrodevco/nitro-packets', replacement: r('../nitro-packets/src') },
                    ]),
        ],
    },
    server: {
        port: 5173,
        strictPort: true,
        fs: {
            allow: [r('.'), r('..'), r('../..')],
        },
        // Transform the app's import graph while the server starts instead of on first request.
        warmup: {
            clientFiles: [ './src/index.tsx' ],
        },
    },
    };
});
