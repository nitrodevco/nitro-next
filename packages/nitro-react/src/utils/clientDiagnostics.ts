/**
 * What the client's own diagnostics say about it - the bug report capture, the client error reports,
 * the tracking's client info and the startup log share them. The page is never given with its query:
 * that carries the SSO ticket.
 */
/** The build's name, replaced at build time (vite.config.ts `buildId`); undefined outside Vite. */
declare const __NITRO_BUILD__: string | undefined;

/** The build's own name (`NITRO_BUILD`, the commit), or `dev`. */
export const clientBuild = (): string => ((typeof __NITRO_BUILD__ === 'string') ? __NITRO_BUILD__ : 'dev');

/** The page the client runs on, without its query. */
export const clientPage = (): string => `${window.location.origin}${window.location.pathname}`;

/** The window's size in CSS pixels, and the device pixel ratio. */
export const clientViewport = () => ({ width: window.innerWidth, height: window.innerHeight, pixelRatio: window.devicePixelRatio });

/** Whole milliseconds since the page started. */
export const clientUptimeMs = (): number => Math.round(performance.now());

/** A logged value or thrown error as text; an error with its stack when `withStack`. */
export const describeDiagnosticValue = (value: unknown, withStack: boolean = false): string => {
    if (value instanceof Error) return `${value.name}: ${value.message}${(withStack && value.stack) ? `\n${value.stack}` : ''}`;
    if (typeof value === 'string') return value;

    try {
        return JSON.stringify(value) ?? String(value);
    } catch {
        return String(value);
    }
};
