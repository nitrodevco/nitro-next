/**
 * The preview host: the client booted inside an admin panel's frame (`?preview` on the page's
 * query) to draw a draft in the game's own window. It loads the config, the gamedata, the renderer
 * and the theme as the client does, but never opens the connection and never logs in; the data comes
 * by `postMessage`, and only from an origin `preview.allowed_origins` names. Not a Flash feature.
 */

/** The config key naming the origins that may drive the preview host: an array, or a comma list. */
export const PREVIEW_ALLOWED_ORIGINS_KEY = 'preview.allowed_origins';

/** The `type` every message to and from the preview host carries. */
export const PREVIEW_MESSAGE_TYPE = 'nitro-preview';

const IS_PREVIEW_HOST = new URLSearchParams(window.location.search).has('preview');

/** Whether this page is the preview host. */
export const isPreviewHost = () => IS_PREVIEW_HOST;

/** The origins `preview.allowed_origins` names, each as `URL.origin` writes it; none when unset. */
export const parsePreviewAllowedOrigins = (value: unknown): string[] => {
    const entries = Array.isArray(value) ? value : (typeof value === 'string') ? value.split(',') : [];
    const origins: string[] = [];

    for (const entry of entries) {
        if (typeof entry !== 'string' || !entry.trim().length) continue;

        try {
            const origin = new URL(entry.trim()).origin;

            if (origin !== 'null' && !origins.includes(origin)) origins.push(origin);
        } catch {
            // Not a URL: never an origin a message can come from.
        }
    }

    return origins;
};
