import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { existsSync, readdirSync, readFileSync, rmdirSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, Plugin } from 'vite';

const r = (p: string) => `${import.meta.dirname}/${p}`;

/**
 * Drops the art that is already inside a `.nitro` bundle from the built output.
 *
 * Everything under `public/assets/<component>/` is the input of
 * `scripts/build-asset-bundles.ts`, not something the client fetches: it is packed into
 * `public/assets/bundles/*.nitro` and reached through the `AssetManager` by asset name. Vite
 * copies `public/` verbatim, though, so without this the same ~1,800 files ship a second time
 * loose beside the bundles that contain them.
 *
 * The prune list is the builder's own manifest (`bundles.json`, one `absorbed` entry per file a
 * bundle took in), so a bundle definition and the files it removes can never drift apart - and
 * a hand-placed file no bundle names is left alone.
 */
const pruneBundledAssets = (): Plugin => ({
    name: 'prune-bundled-assets',
    apply: 'build',
    closeBundle() {
        const manifest = r('public/assets/bundles/bundles.json');

        if (!existsSync(manifest)) {
            this.warn('No public/assets/bundles/bundles.json - run `yarn build-asset-bundles`. The loose art has been left in the output.');

            return;
        }

        const { bundles } = JSON.parse(readFileSync(manifest, 'utf8')) as { bundles: { absorbed: string[] }[] };
        const root = r('dist/assets');
        let removed = 0;

        for (const bundle of bundles) {
            for (const absorbed of bundle.absorbed) {
                const file = path.join(root, absorbed);

                if (!existsSync(file)) continue;

                rmSync(file);
                removed++;
            }
        }

        // Bottom-up, so a folder emptied by the pass above goes with its contents. `dist/assets`
        // itself always holds the built chunks, so it is never a candidate.
        const pruneEmpty = (dir: string): boolean => {
            for (const entry of readdirSync(dir)) {
                const full = path.join(dir, entry);

                if (statSync(full).isDirectory() && pruneEmpty(full)) rmdirSync(full);
            }

            return !readdirSync(dir).length;
        };

        // The manifest itself is a build record, not a runtime file - it is read from `public/`
        // above, so the copy in the output goes too.
        const shipped = path.join(root, 'bundles/bundles.json');

        if (existsSync(shipped)) rmSync(shipped);

        pruneEmpty(root);

        this.info(`Pruned ${removed} bundled asset files from dist/assets`);
    },
});

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
                    // The blanket `node_modules -> vendor` rule below would otherwise put both
                    // sides of such an `import()` in `vendor` - a silent black screen in the
                    // production build while dev (unbundled) is fine.
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
        pruneBundledAssets(),
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
