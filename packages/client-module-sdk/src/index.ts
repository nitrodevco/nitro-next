/**
 * `@nitrodevco/client-module-sdk`: what a client module is written against. The API's types, and
 *
 * - `defineModule({ activate, deactivate })`: the module's default export, typed;
 * - `useApi()`: the module's API from any component it draws;
 * - `assetUrl(path)`: a file beside the module in its plugin's `wwwroot/`.
 *
 * React comes from `react` and the theme from `@nitrodevco/client-module-sdk/theme`; the bundler
 * preset (`@nitrodevco/client-module-sdk/build`) makes both the client's own.
 */
import type { ClientModuleApi } from './api';

export type * from './types';

export interface ClientModuleDefinition {
    /** Called once the client has the module: add windows, icons, patches, packets here. */
    activate(api: ClientModuleApi): void | Promise<void>;
    /**
     * Called when the module stops (the plugin unloads or reloads, or the client leaves). What was
     * added through the API is taken out by the client; undo here only what the module did besides.
     */
    deactivate?(): void | Promise<void>;
}

let current: ClientModuleApi | undefined;

/** The module's default export: `export default defineModule({ activate(api) { ... } })`. */
export const defineModule = (definition: ClientModuleDefinition): ClientModuleDefinition => ({
    activate(api) {
        current = api;

        return definition.activate(api);
    },
    async deactivate() {
        try {
            await definition.deactivate?.();
        } finally {
            current = undefined;
        }
    },
});

/** The API the module was activated with, for its components and helpers. */
export const useApi = (): ClientModuleApi => {
    if (!current) throw new Error('useApi() before the module was activated: call it from a component or after activate(api).');

    return current;
};

/** The address of a file beside the module in its plugin's `wwwroot/` (`assetUrl('icon.png')`). */
export const assetUrl = (path: string): string => new URL(path, useApi().baseUrl).href;
