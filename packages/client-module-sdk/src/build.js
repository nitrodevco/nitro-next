/**
 * The bundler preset for client modules (esbuild). A module is one file the client runs from the
 * bytes it checked, so everything is bundled into it - except the libraries the client shares, which
 * must be the client's own: a second React cannot draw into the client's tree. `react`,
 * `react/jsx-runtime` and `zustand` therefore resolve to the client's, read from
 * `globalThis.NitroClientModuleHost` when the module runs; the theme (`@nitrodevco/client-module-sdk/theme`)
 * reads the same global itself.
 *
 *   import * as esbuild from 'esbuild';
 *   import { clientModuleBuildOptions } from '@nitrodevco/client-module-sdk/build';
 *   await esbuild.build(clientModuleBuildOptions({ entry: 'client/src/index.tsx', outfile: 'dist/skills/wwwroot/skills.js' }));
 *
 * Plain JavaScript on purpose: Node runs it from `node_modules` without a TypeScript step.
 */

/** Each shared library, by import path, and where the client keeps it on `NitroClientModuleHost`. */
export const HOST_LIBRARIES = {
    react: 'react',
    'react/jsx-runtime': 'reactJsxRuntime',
    'react/jsx-dev-runtime': 'reactJsxRuntime',
    zustand: 'zustand',
};

const NAMESPACE = 'nitro-client-module-host';

/** The esbuild plugin: the shared libraries as the client's, never bundled. */
export const clientModuleHostPlugin = () => ({
    name: 'nitro-client-module-host',
    setup(build) {
        const filter = new RegExp(`^(${Object.keys(HOST_LIBRARIES).join('|')})$`);

        build.onResolve({ filter }, args => ({ path: args.path, namespace: NAMESPACE }));
        // CommonJS on purpose: esbuild then reads each named import off the client's object as the
        // module runs (`import { useState } from 'react'`), so no list of names is kept here.
        build.onLoad({ filter: /.*/, namespace: NAMESPACE }, args => ({
            contents: `const host = globalThis.NitroClientModuleHost;
if (!host) throw new Error('No Nitro client here: this client module runs inside the client.');
module.exports = host.${HOST_LIBRARIES[args.path]};`,
            loader: 'js',
        }));
    },
});

/**
 * esbuild options for one module: `entry` bundled to the single ES module `outfile`, JSX with the
 * client's React, the shared libraries left to the client.
 */
export const clientModuleBuildOptions = ({ entry, outfile, minify = false, sourcemap = minify ? false : 'inline', define = {}, plugins = [] }) => ({
    entryPoints: [ entry ],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    jsx: 'automatic',
    jsxDev: false,
    minify,
    sourcemap,
    legalComments: 'none',
    logLevel: 'silent',
    define: { 'process.env.NODE_ENV': JSON.stringify(minify ? 'production' : 'development'), ...define },
    plugins: [ clientModuleHostPlugin(), ...plugins ],
});
