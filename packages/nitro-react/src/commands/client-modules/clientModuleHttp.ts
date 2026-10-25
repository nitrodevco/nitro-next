/**
 * Not Flash's: what `api.http` does for a client module - calls its own plugin's web routes on the
 * hotel's public web host (`/api/plugins/<key>/<path>`, Turbo's `docs/plugin-web-routes.md`) signed in
 * as the player. The token comes over the socket (`web.session`), is kept here until it nearly runs
 * out, and is asked for again when a route answers 401; a module never sees it.
 */
import { TurboWebSessionMessage, TurboWebSessionRequestComposer } from '@nitrodevco/nitro-packets';

import { TURBO_WEB_SESSION_CAPABILITY } from '#base/context/client-modules';
import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

import type { ClientModuleHttpQuery, ClientModuleHttpResponse } from './ClientModuleApi';

type WebSession = { baseUrl: string; token: string; expiresAt: number };

/** How long before its end a token is replaced rather than sent. */
const RENEW_BEFORE_MS = 60_000;
/** How long the server has to answer a token request. */
const REQUEST_TIMEOUT_MS = 10_000;

let session: WebSession | undefined;
let pending: Promise<WebSession | undefined> | undefined;

/** Forgets the token, as the connection closes. */
export const clearClientModuleWebSession = () => {
    session = undefined;
    pending = undefined;
};

const requestSession = (connection: WebSocketConnection) => {
    pending ??= new Promise<WebSession | undefined>((resolve) => {
        let unsubscribe = () => { };
        const timer = setTimeout(() => {
            unsubscribe();
            resolve(undefined);
        }, REQUEST_TIMEOUT_MS);

        unsubscribe = connection.subscribe(TurboWebSessionMessage, (data) => {
            clearTimeout(timer);
            unsubscribe();
            resolve(data.token ? { baseUrl: data.baseUrl.replace(/\/+$/, ''), token: data.token, expiresAt: Date.now() + (data.expiresInSeconds * 1000) } : undefined);
        });
        connection.send(new TurboWebSessionRequestComposer());
    }).then((next) => {
        session = next;
        pending = undefined;

        return next;
    });

    return pending;
};

const currentSession = (connection: WebSocketConnection, renew: boolean) => {
    if (!renew && session && ((session.expiresAt - Date.now()) > RENEW_BEFORE_MS)) return Promise.resolve(session);

    session = undefined;

    return requestSession(connection);
};

const failed = <T>(status: number, error: string): ClientModuleHttpResponse<T> => ({ ok: false, status, data: undefined, error });

/** The path under the plugin's prefix, or `undefined` for one that tries to leave it. */
const routePath = (path: string) => {
    const segments = path.split('/').filter(segment => segment.length > 0);

    if (segments.some(segment => (segment === '.') || (segment === '..') || segment.includes('?') || segment.includes('#') || segment.includes('%'))) return undefined;

    return segments.map(segment => encodeURIComponent(segment)).join('/');
};

const NO_ROUTES = 'This hotel does not serve plugin routes.';

export const clientModuleFetch = async <T>(connection: WebSocketConnection, moduleKey: string, method: string, path: string, options: { body?: unknown; query?: ClientModuleHttpQuery } = {}): Promise<ClientModuleHttpResponse<T>> => {
    if (!userStore.getState().turboCapabilities.has(TURBO_WEB_SESSION_CAPABILITY)) return failed(0, NO_ROUTES);

    const route = routePath(path);

    if (route === undefined) return failed(0, `${path} is not a path under the plugin's own routes.`);

    const query = new URLSearchParams();

    for (const [ name, value ] of Object.entries(options.query ?? {})) query.set(name, String(value));

    const search = query.size ? `?${query.toString()}` : '';

    const send = async (renew: boolean): Promise<ClientModuleHttpResponse<T> | 'renew'> => {
        const web = await currentSession(connection, renew);

        if (!web) return failed(0, NO_ROUTES);

        const response = await fetch(`${web.baseUrl}/api/plugins/${encodeURIComponent(moduleKey)}/${route}${search}`, {
            method,
            headers: { Authorization: `Bearer ${web.token}`, ...((options.body !== undefined) && { 'Content-Type': 'application/json' }) },
            body: (options.body !== undefined) ? JSON.stringify(options.body) : undefined,
            credentials: 'omit',
        });

        if ((response.status === 401) && !renew) return 'renew';

        const text = await response.text();
        let json: unknown;

        try {
            json = text ? JSON.parse(text) : undefined;
        } catch {
            // Not JSON: the route's answer has no data, and its status still says how it went.
        }

        if (response.ok) return { ok: true, status: response.status, data: json as T, error: undefined };

        const error = (json && (typeof json === 'object') && ('error' in json)) ? String(json.error) : response.statusText;

        return failed(response.status, error);
    };

    // A token the server no longer knows (a restart, a newer one) is replaced once.
    const first = await send(false);

    if (first !== 'renew') return first;

    const second = await send(true);

    return (second === 'renew') ? failed(401, 'Sign in first.') : second;
};
