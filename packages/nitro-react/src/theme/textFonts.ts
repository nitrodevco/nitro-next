/**
 * Not Flash's: `text.fonts`, the hotel variable a theme gives the client font files with -
 * `{ "<family>": "<url>" }`, the object or the object as JSON text; Turbo merges each plugin's entries
 * in, a file of its `wwwroot` named by its path. Each is added to `document.fonts` as that family
 * before the first text is drawn, so a text style's `fontFamily` (`text.styles.overrides`) or a
 * layout's `font_face` names it. The exact renderer draws only the faces the client ships, so a text
 * in one of these is browser text, in the theme's face.
 *
 * A file that does not load is said on the console with its address (whatever `log.error` is), and
 * its texts take the browser's default face.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';

/** The variable's key. */
export const TEXT_FONTS_KEY = 'text.fonts';

/** The longest the client waits on the fonts before its first text: a slow file draws in its face once it lands. */
const FONT_WAIT_MS = 5000;

/** Each family added, with the url it came from. */
const added = new Map<string, { url: string; face: FontFace }>();

/** `text.fonts` as family to url; entries that are no url are left out, none for text that is not JSON. */
export const parseTextFonts = (value: unknown): Map<string, string> => {
    const fonts = new Map<string, string>();
    let parsed = value;

    if (typeof parsed === 'string') {
        try {
            parsed = parsed.trim().length ? JSON.parse(parsed) as unknown : {};
        } catch {
            NitroLogger.warn('TextFonts', `${TEXT_FONTS_KEY} is not JSON: no font is loaded.`);

            return fonts;
        }
    }

    if (!parsed || (typeof parsed !== 'object') || Array.isArray(parsed)) return fonts;

    for (const [ family, url ] of Object.entries(parsed as Record<string, unknown>)) {
        if (family.trim().length && (typeof url === 'string') && url.length) fonts.set(family.trim(), url);
    }

    return fonts;
};

const addOne = async (family: string, url: string) => {
    try {
        const face = await new FontFace(family, `url(${JSON.stringify(url)})`).load();

        document.fonts.add(face);
        added.set(family, { url, face });
    } catch (error) {
        const message = `${family}: ${url} did not load (${error instanceof Error ? error.message : String(error)}); its texts take the browser's default face.`;

        NitroLogger.error('TextFonts', message);
        console.warn('[TextFonts]', message);
    }
};

/**
 * Makes the page's theme fonts the ones `value` names: each family loaded from its url (one already
 * there from another url is replaced), each one added before and not named now taken away. Resolves
 * once every one has loaded or failed, or after `FONT_WAIT_MS`; never rejects.
 */
export const loadTextFonts = (value: unknown): Promise<void> => {
    if (typeof document === 'undefined') return Promise.resolve();

    const fonts = parseTextFonts(value);

    for (const [ family, { url, face } ] of added) {
        if (fonts.get(family) === url) continue;

        document.fonts.delete(face);
        added.delete(family);
    }

    const loading = [ ...fonts ].filter(([ family ]) => !added.has(family)).map(([ family, url ]) => addOne(family, url));

    if (!loading.length) return Promise.resolve();

    return Promise.race([ Promise.all(loading).then(() => undefined), new Promise<void>(resolve => setTimeout(resolve, FONT_WAIT_MS)) ]);
};
