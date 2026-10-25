/**
 * Not Flash's: which client module handlers an in-client link `<prefix>/<path>` goes to. A module
 * handles a prefix (`links.handle('myhotel', fn)`) or a path under it (`links.handle('myhotel', fn, { path:
 * 'news/*' })`): a path is the link's next parts, `*` standing for any one part, and matches a link
 * whose parts begin with it. A link goes to the handlers of the most specific path that matches - the
 * most parts, a named part before `*` - and only when none does to the handlers of the whole prefix,
 * every one of them, as before paths. Two modules on one prefix and path both get its links: that is a
 * conflict, logged as it is made and listed by the extension inspector.
 *
 * Kept free of runtime imports, so a test can run it under Node.
 */

export interface ClientModuleLinkRoute {
    moduleKey: string;
    /** The link's first part. */
    prefix: string;
    /** The parts after the prefix it takes, `*` for any one; `undefined` (or `''`) for the whole prefix. */
    path?: string;
}

export interface ClientModuleLinkConflict {
    prefix: string;
    /** `''` for the whole prefix. */
    path: string;
    /** Each module with a handler on it, in the order they were added. */
    modules: string[];
}

const partsOf = (path: string | undefined) => (path ?? '').split('/').filter(part => part.length);

/** A path's parts, as written, joined again: `'/news//*'` and `'news/*'` are one path. */
export const normalizeLinkPath = (path: string | undefined) => partsOf(path).join('/');

/** How specific a matching path is: its parts, then its named parts. */
const specificity = (parts: string[]) => (parts.length * 1000) + parts.filter(part => part !== '*').length;

const matches = (pattern: string[], parts: string[]) => (pattern.length <= parts.length) && pattern.every((part, index) => (part === '*') || (part === parts[index]));

/** The handlers `link` goes to, in the order they were added; none when no handler has its prefix. */
export const routeClientModuleLink = <T extends ClientModuleLinkRoute>(handlers: readonly T[], link: string): T[] => {
    const [ prefix, ...parts ] = link.split('/');
    const own = handlers.filter(handler => handler.prefix === prefix);
    let best = -1;
    let chosen: T[] = [];

    for (const handler of own) {
        const pattern = partsOf(handler.path);

        if (!pattern.length || !matches(pattern, parts)) continue;

        const score = specificity(pattern);

        if (score > best) {
            best = score;
            chosen = [ handler ];
        } else if (score === best) chosen.push(handler);
    }

    return chosen.length ? chosen : own.filter(handler => !partsOf(handler.path).length);
};

/** Each prefix and path more than one module handles. */
export const clientModuleLinkConflicts = (handlers: readonly ClientModuleLinkRoute[]): ClientModuleLinkConflict[] => {
    const byRoute = new Map<string, ClientModuleLinkConflict>();

    for (const handler of handlers) {
        const path = normalizeLinkPath(handler.path);
        const key = `${handler.prefix}\u0000${path}`;
        const route = byRoute.get(key) ?? { prefix: handler.prefix, path, modules: [] };

        if (!route.modules.includes(handler.moduleKey)) route.modules.push(handler.moduleKey);

        byRoute.set(key, route);
    }

    return [ ...byRoute.values() ].filter(route => route.modules.length > 1);
};
