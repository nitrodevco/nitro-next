/**
 * Not Flash's: the theme this player draws the hotel with (Turbo's `docs/plugin-data.md`, "Who gets
 * which theme"). While the hotel has a theme in development or one players may choose, its variables
 * name `theme.session.url`: before it connects, the client asks there with the ticket it logs in with
 * and gets its theme's merged variables (`templates.patches`, `asset.overlays`, ...) when they are not
 * the ones it loaded, which it reads in their place - so the first frame is already the player's
 * theme. The answer also lists the themes the player may choose, for the chooser in the other
 * settings window; a choice is the named message `turbo.theme.choose` and is drawn from the next load.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { useSyncExternalStore } from 'react';

import { onPluginMessage, sendPluginMessage } from '#base/commands/client-modules/pluginMessages';

export const THEME_SESSION_URL_KEY = 'theme.session.url';

/** The query key staff's "Preview as" link names a theme with, for one load. */
export const THEME_PREVIEW_PARAM = 'theme';

const OWNER = 'theme';

export interface ThemeChoice {
    key: string;
    name: string;
}

export interface ThemeSession {
    /** The theme drawn; empty for the hotel's default. */
    theme: string;
    choices: ThemeChoice[];
    /** The player's own choice; empty for the hotel's default. */
    chosen: string;
}

interface ThemeAnswer extends ThemeSession {
    variables: Record<string, string> | null;
}

let session: ThemeSession | undefined;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

const getSession = () => session;

/** The player's theme and the ones they may choose; undefined when the hotel has no theme to choose. */
export const useThemeSession = () => useSyncExternalStore(subscribe, getSession);

/** A merged variable's value as the server keeps it (JSON text), read as the file gives it (its value). */
const valueOf = (json: string): unknown => {
    try {
        return JSON.parse(json);
    } catch {
        return json;
    }
};

/**
 * Asks `theme.session.url` for this player's theme, with the ticket in the page's address; the
 * variables to read in place of the loaded ones, or none (no address, no ticket, the default's own,
 * or the host not answering - the hotel's look is drawn then).
 */
export const loadThemeSession = async (url: unknown, query: URLSearchParams): Promise<Record<string, unknown>> => {
    const ticket = query.get('sso');

    if ((typeof url !== 'string') || !url.length || !ticket) return {};

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticket, theme: query.get(THEME_PREVIEW_PARAM) ?? undefined }),
        });

        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

        const answer = await response.json() as ThemeAnswer;

        session = { theme: answer.theme ?? '', choices: answer.choices ?? [], chosen: answer.chosen ?? '' };
        listeners.forEach(listener => listener());

        return Object.fromEntries(Object.entries(answer.variables ?? {}).map(([ key, value ]) => [ key, valueOf(value) ]));
    } catch (error) {
        NitroLogger.warn('Theme', `The theme could not be asked for at ${url}: the hotel's look is drawn.`, error);

        return {};
    }
};

/** The theme drawn now, live reload having drawn another (`themeLive.ts`). */
export const noteThemeDrawn = (theme: string) => {
    if (!session || (session.theme === theme)) return;

    session = { ...session, theme };
    listeners.forEach(listener => listener());
};

/** Keeps the player's choice (empty: the hotel's default); `done` hears whether it was kept, and why not. */
export const chooseTheme = (key: string, done: (ok: boolean, message: string) => void) => {
    const stop = onPluginMessage(OWNER, 'turbo.theme.chosen', (data) => {
        if (data.key !== key) return;

        stop();

        if (data.ok && session) {
            session = { ...session, chosen: key };
            listeners.forEach(listener => listener());
        }

        done(!!data.ok, typeof data.message === 'string' ? data.message : '');
    });

    sendPluginMessage(OWNER, 'turbo.theme.choose', { key });
};
