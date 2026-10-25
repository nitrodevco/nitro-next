import { rename, rm } from 'node:fs/promises';

import { build, type Plugin } from 'esbuild';

/**
 * Builds the imager into `dist/`, which `node dist/main.js` runs. The workspace packages it uses
 * (`@nitrodevco/*`) export their TypeScript source, so they are bundled in; every other package is
 * left to Node to load from `node_modules`, as it would be under tsx.
 *
 * Code splitting keeps `main.ts`'s order: `startImager` and the renderer stay in a chunk of their
 * own, loaded by its dynamic import after the Node stand-ins for the browser are installed. In one
 * file, the packages they import would be imported at its top, before those stand-ins.
 */
const externalPackages: Plugin = {
    name: 'external-packages',
    setup(build) {
        build.onResolve({ filter: /^[^./#]/ }, (args) => {
            if (args.path.startsWith('@nitrodevco/')) return undefined;

            return { path: args.path, external: true };
        });
    },
};

// Built beside `dist` and swapped in whole: a failed build leaves the last one runnable, and the
// last build's chunks (their names carry a hash) do not pile up beside the new ones.
await rm('dist-next', { recursive: true, force: true });

await build({
    entryPoints: [ 'src/main.ts' ],
    outdir: 'dist-next',
    bundle: true,
    splitting: true,
    format: 'esm',
    platform: 'node',
    target: 'node24',
    sourcemap: true,
    logLevel: 'info',
    plugins: [ externalPackages ],
});

await rm('dist', { recursive: true, force: true });
await rename('dist-next', 'dist');
