import type { BuildOptions, Plugin } from 'esbuild';

/** Each shared library, by import path, and where the client keeps it on `NitroClientModuleHost`. */
export declare const HOST_LIBRARIES: Readonly<Record<string, string>>;

/** The esbuild plugin: `react`, `react/jsx-runtime` and `zustand` as the client's, never bundled. */
export declare const clientModuleHostPlugin: () => Plugin;

export interface ClientModuleBuildInput {
    /** The module's entry, `client/src/index.tsx`. */
    entry: string;
    /** The one file the client loads, `dist/<key>/wwwroot/<key>.js`. */
    outfile: string;
    /** For a package: minified, no source map. */
    minify?: boolean;
    sourcemap?: BuildOptions['sourcemap'];
    define?: Record<string, string>;
    plugins?: Plugin[];
}

/** esbuild options for one module: pass them to `esbuild.build` or `esbuild.context`. */
export declare const clientModuleBuildOptions: (input: ClientModuleBuildInput) => BuildOptions;
