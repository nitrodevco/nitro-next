/**
 * Not Flash's: runs the client modules Turbo's `client.modules` extension names
 * (`TurboClientModulesMessage`, the whole set each time). A module is an ES module: the loader
 * `import()`s it and calls its `activate(api)` with the `ClientModuleApi`, and its `deactivate()`
 * when the server drops it or names another version or file - then the module's next version starts.
 *
 * What runs is checked first:
 *
 * - The URL is resolved against the page and must be `http(s)`. One on another origin than the
 *   client's is refused unless its origin or host is in `client.modules.hosts` (a list, or one
 *   comma-separated text).
 * - With a SHA-256 the file is fetched, hashed and run from those very bytes (a `blob:` URL), so
 *   what runs is what was checked; a mismatch, or a browser without `crypto.subtle`, refuses it.
 *   Such a module is one file: a relative import inside it has no base to resolve against.
 *
 * A module that fails to load or throws in `activate` is stopped and left out; the others run.
 * Changes are applied one message at a time, in the order they came.
 *
 * A module refused or failing is said loudly: a console warning (the logger's are quiet by default)
 * naming what to change, and a report to the server (`reportClientExtension`), whose log and
 * extension inspector name it too - a refused module otherwise just never runs.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { ITurboClientModule } from '@nitrodevco/nitro-packets';

import { CLIENT_MODULES_HOSTS_KEY } from '#base/context/client-modules';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';

import { reportClientExtension } from './clientExtensionReports';
import { ClientModuleApi } from './ClientModuleApi';
import { getClientModuleLibraries } from './clientModuleLibraries';
import { createClientModuleApi } from './createClientModuleApi';

/** What a module's file exports: `activate` and `deactivate` on its default export, or as named exports. */
interface ClientModuleExports {
    activate?: (api: ClientModuleApi) => unknown;
    deactivate?: () => unknown;
}

interface RunningClientModule {
    module: ITurboClientModule;
    exports: ClientModuleExports;
    dispose: () => void;
}

const running = new Map<string, RunningClientModule>();
let queue: Promise<void> = Promise.resolve();

/** `client.modules.hosts`: the origins (`https://cdn.example.com`) or hosts (`cdn.example.com:8443`) a module may come from. */
const allowedHosts = (): string[] => {
    const value = systemStore.getState().config[CLIENT_MODULES_HOSTS_KEY];
    const list = Array.isArray(value) ? value : (typeof value === 'string') ? value.split(',') : [];

    return list.map(entry => String(entry).trim().toLowerCase()).filter(entry => entry.length);
};

/** Why a module did not run, as the server's inspector files it. */
type RefusalReason = 'url' | 'host' | 'hash' | 'load' | 'exports' | 'activate';

/** Says a module did not run: a console warning, and a report to the server when the module's owner is known. */
const refuse = (owner: string | undefined, url: string, reason: RefusalReason, message: string, error?: unknown) => {
    const text = owner ? `Client module ${owner} did not run: ${message}` : `Client module refused: ${message}`;

    if (error === undefined) console.warn(`[ClientModules] ${text}`);
    else console.warn(`[ClientModules] ${text}`, error);

    if (owner) reportClientExtension({ owner, kind: reason === 'activate' ? 'module.failed' : 'module.refused', subject: url, reason, message });
};

/** The module's URL when it may be loaded, `undefined` (and a warning, reported for `owner`) when not. */
export const resolveClientModuleUrl = (url: string, owner?: string): URL | undefined => {
    let resolved: URL;

    try {
        resolved = new URL(url, window.location.href);
    } catch {
        refuse(owner, url, 'url', `${url} is not a URL.`);

        return undefined;
    }

    if ((resolved.protocol !== 'https:') && (resolved.protocol !== 'http:')) {
        refuse(owner, resolved.href, 'url', `${resolved.href}: only http(s) modules are loaded.`);

        return undefined;
    }

    if (resolved.origin === window.location.origin) return resolved;

    const hosts = allowedHosts();

    if (hosts.includes(resolved.origin.toLowerCase()) || hosts.includes(resolved.host.toLowerCase())) return resolved;

    refuse(owner, resolved.href, 'host', `${resolved.origin} is not in the hotel's ${CLIENT_MODULES_HOSTS_KEY} (external variables). Add "${resolved.origin}" to ${CLIENT_MODULES_HOSTS_KEY}, or serve plugin files from ${window.location.origin}.`);

    return undefined;
};

const toHex = (buffer: ArrayBuffer) => Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, '0')).join('');

/** The module's exports: imported from the URL, or from the checked bytes when it has a SHA-256. */
const importModule = async (owner: string, url: URL, sha256: string): Promise<ClientModuleExports | undefined> => {
    if (!sha256.length) return await import(/* @vite-ignore */ url.href) as ClientModuleExports;

    if (!globalThis.crypto?.subtle) {
        refuse(owner, url.href, 'hash', `${url.href}: this page cannot check a SHA-256 (no crypto.subtle; serve the client over https).`);

        return undefined;
    }

    const response = await fetch(url.href, { credentials: 'omit' });

    if (!response.ok) {
        refuse(owner, url.href, 'load', `${url.href} answered HTTP ${response.status}.`);

        return undefined;
    }

    const bytes = await response.arrayBuffer();
    const digest = toHex(await crypto.subtle.digest('SHA-256', bytes));

    if (digest !== sha256.toLowerCase()) {
        refuse(owner, url.href, 'hash', `${url.href}: SHA-256 ${digest} is not the ${sha256} the server named (the file changed after the server read it).`);

        return undefined;
    }

    const blobUrl = URL.createObjectURL(new Blob([ bytes ], { type: 'text/javascript' }));

    try {
        return await import(/* @vite-ignore */ blobUrl) as ClientModuleExports;
    } finally {
        URL.revokeObjectURL(blobUrl);
    }
};

/** `activate` / `deactivate`, off the default export or the named ones. */
const readExports = (namespace: Record<string, unknown>): ClientModuleExports => {
    const fallback = namespace.default;
    const holder = ((typeof fallback === 'object') && fallback) ? fallback as ClientModuleExports : namespace as ClientModuleExports;

    return { activate: holder.activate?.bind(holder), deactivate: holder.deactivate?.bind(holder) };
};

const stopModule = (key: string) => {
    const entry = running.get(key);

    if (!entry) return;

    running.delete(key);

    try {
        entry.exports.deactivate?.();
    } catch (error) {
        NitroLogger.error('ClientModules', `${key}: deactivate threw`, error);
    }

    entry.dispose();
};

const startModule = async (connection: WebSocketConnection, module: ITurboClientModule) => {
    const url = resolveClientModuleUrl(module.url, module.key);

    if (!url) return;

    // Set before the import, so a bundled module finds the shared libraries at its top level.
    getClientModuleLibraries();

    let exports: ClientModuleExports | undefined;

    try {
        const namespace = await importModule(module.key, url, module.sha256);

        exports = namespace && readExports(namespace as Record<string, unknown>);
    } catch (error) {
        refuse(module.key, url.href, 'load', `${url.href} did not load: ${error instanceof Error ? error.message : String(error)}`, error);

        return;
    }

    if (!exports) return;

    if (!exports.activate) {
        refuse(module.key, url.href, 'exports', `${url.href} exports no activate(api).`);

        return;
    }

    const { api, dispose } = createClientModuleApi(connection, module.key, url.href);

    running.set(module.key, { module, exports, dispose });

    try {
        await exports.activate(api);
    } catch (error) {
        refuse(module.key, url.href, 'activate', `activate threw: ${error instanceof Error ? error.message : String(error)}`, error);
        stopModule(module.key);
    }
};

const isSameModule = (a: ITurboClientModule, b: ITurboClientModule) => (a.url === b.url) && (a.version === b.version) && (a.sha256 === b.sha256);

/**
 * Brings the running modules in line with the server's set: stops those it no longer names or
 * names differently, then starts the new ones, one after another in its order.
 */
export const syncClientModules = (connection: WebSocketConnection, modules: ITurboClientModule[]) => {
    queue = queue.then(async () => {
        const wanted = new Map(modules.map(module => [ module.key, module ]));

        for (const [ key, entry ] of [ ...running ]) {
            const next = wanted.get(key);

            if (!next || !isSameModule(entry.module, next)) stopModule(key);
        }

        for (const module of wanted.values()) {
            if (!running.has(module.key)) await startModule(connection, module);
        }
    }).catch(error => NitroLogger.error('ClientModules', error));

    return queue;
};

/** Stops every module: the server declined the extension, or the connection is gone. */
export const stopClientModules = () => {
    queue = queue.then(() => {
        for (const key of [ ...running.keys() ]) stopModule(key);
    });

    return queue;
};
