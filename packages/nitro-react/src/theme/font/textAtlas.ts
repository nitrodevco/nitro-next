import { useEffect, useState } from 'react';

/**
 * Runtime reader for the bitmap font atlases baked by
 * `scripts/build-text-atlas.ts` (see `scripts/habbo-text-styles.ts` for the
 * source catalog). Render-agnostic on purpose - both `theme/font/BitmapTextPixi.tsx`
 * and `theme/dom/BitmapTextDom.tsx` read through this same module so a glyph
 * lookup or a word-wrap decision can never disagree between the two targets.
 */

export interface BitmapGlyph {
    x: number;
    y: number;
    width: number;
    height: number;
    xOffset: number;
    yOffset: number;
    xAdvance: number;
}

interface ManifestFontEntry {
    fontFamily: string;
    fontSize: number;
    bold: boolean;
    italic: boolean;
    lineHeight: number;
    baseLineOffset: number;
    defaultTint: string | null;
    underline: boolean;
    file: string;
    chars: Record<string, BitmapGlyph>;
}

interface Manifest {
    format: string;
    version: number;
    fonts: Record<string, ManifestFontEntry>;
}

export interface BitmapFont extends ManifestFontEntry {
    key: string;
    image: ImageBitmap;
}

const ATLAS_BASE = '/assets/webfonts/atlas';
const RETRY_DELAYS_MS = [ 500, 1500, 4000 ];

let manifest: Manifest | undefined;
let manifestPromise: Promise<Manifest | undefined> | undefined;

const fetchManifest = async (): Promise<Manifest | undefined> => {
    try {
        const response = await fetch(`${ATLAS_BASE}/manifest.json`);

        if (!response.ok) return undefined;

        return await response.json() as Manifest;
    } catch {
        return undefined;
    }
};

/**
 * Preloads the (small, metadata-only) manifest before the app mounts - called
 * alongside `loadThemeFonts()` in `index.tsx`. Without this, every `ThemeText`
 * would render through the native fallback once (manifest not loaded yet),
 * then flash to the bitmap look a moment later; awaiting it at boot, like the
 * webfonts already are, means every first paint already knows which combos
 * are baked. Bounded retry, same shape as `usePixiTexture.ts`'s texture load.
 */
export const preloadTextAtlas = async (): Promise<void> => {
    for (let attempt = 0; ; attempt++) {
        const result = await fetchManifest();

        if (result) {
            manifest = result;

            return;
        }

        if (attempt >= RETRY_DELAYS_MS.length) return;

        await new Promise(resolve => setTimeout(resolve, RETRY_DELAYS_MS[attempt]));
    }
};

const loadManifest = (): Promise<Manifest | undefined> => {
    if (manifest) return Promise.resolve(manifest);

    manifestPromise ??= preloadTextAtlas().then(() => manifest);

    return manifestPromise;
};

/** Synchronous - safe to call during render once the boot-time preload has resolved
 *  (the normal case); returns `false` before that or when nothing was baked for this
 *  key, which is exactly the fallback-to-native-rendering signal callers want. */
export const hasBitmapFont = (habboKey: string | undefined): boolean => !!habboKey && !!manifest?.fonts[habboKey];

const imageCache = new Map<string, Promise<ImageBitmap | undefined>>();

const loadAtlasImage = (file: string): Promise<ImageBitmap | undefined> => {
    const url = `${ATLAS_BASE}/${file}`;
    const cached = imageCache.get(url);

    if (cached) return cached;

    const promise = (async () => {
        try {
            const response = await fetch(url);

            if (!response.ok) throw new Error(String(response.status));

            return await createImageBitmap(await response.blob());
        } catch {
            imageCache.delete(url);

            return undefined;
        }
    })();

    imageCache.set(url, promise);

    return promise;
};

const loadBitmapFont = async (habboKey: string): Promise<BitmapFont | undefined> => {
    const meta = (await loadManifest())?.fonts[habboKey];

    if (!meta) return undefined;

    const image = await loadAtlasImage(meta.file);

    return image ? { key: habboKey, ...meta, image } : undefined;
};

/** Resolves a `TEXT_STYLES` entry's `habboKey` to its decoded bitmap font, retrying
 *  on transient failure the same way `useTextureFromUrl` does. Returns `undefined`
 *  (and stays `undefined`) for any key nothing was baked for - callers fall back to
 *  today's native text rendering in that case, unchanged. */
export const useBitmapFont = (habboKey: string | undefined): BitmapFont | undefined => {
    const [ font, setFont ] = useState<BitmapFont | undefined>(undefined);

    useEffect(() => {
        if (!habboKey) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFont(undefined);

            return;
        }

        let cancelled = false;
        let timeoutId: ReturnType<typeof setTimeout>;

        const attempt = (retriesLeft: number) => {
            void loadBitmapFont(habboKey).then((result) => {
                if (cancelled) return;

                if (result) {
                    setFont(result);
                } else if (retriesLeft > 0) {
                    const delay = RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - retriesLeft];

                    timeoutId = setTimeout(() => attempt(retriesLeft - 1), delay);
                }
            });
        };

        attempt(RETRY_DELAYS_MS.length);

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, [ habboKey ]);

    return font;
};

export interface BitmapTextLine {
    text: string;
    width: number;
}

export interface BitmapTextLayout {
    lines: BitmapTextLine[];
    width: number;
    height: number;
}

export interface BitmapTextLayoutOptions {
    wordWrap?: boolean;
    wordWrapWidth?: number;
    breakWords?: boolean;
}

const measureAdvance = (font: BitmapFont, text: string): number => {
    let width = 0;

    for (const ch of text) width += font.chars[ch]?.xAdvance ?? font.chars[' ']?.xAdvance ?? 0;

    return width;
};

/**
 * Advance-table line breaking (no kerning pairs, no canvas/DOM measurement calls) -
 * used by both `BitmapTextPixi` and `BitmapTextDom` so they always wrap identically.
 */
export const layoutBitmapText = (text: string, font: BitmapFont, opts: BitmapTextLayoutOptions = {}): BitmapTextLayout => {
    const outLines: BitmapTextLine[] = [];
    const maxWidth = opts.wordWrap ? opts.wordWrapWidth : undefined;

    for (const rawLine of text.split('\n')) {
        if (!maxWidth) {
            outLines.push({ text: rawLine, width: measureAdvance(font, rawLine) });

            continue;
        }

        let current = '';
        let currentWidth = 0;

        const flush = () => {
            outLines.push({ text: current, width: currentWidth });
            current = '';
            currentWidth = 0;
        };

        for (const word of rawLine.split(' ')) {
            let candidate = current ? `${current} ${word}` : word;
            let candidateWidth = measureAdvance(font, candidate);

            if (candidateWidth > maxWidth && current) {
                flush();
                candidate = word;
                candidateWidth = measureAdvance(font, word);
            }

            if (candidateWidth > maxWidth && opts.breakWords) {
                let piece = '';
                let pieceWidth = 0;

                for (const ch of word) {
                    const chWidth = font.chars[ch]?.xAdvance ?? 0;

                    if (piece && pieceWidth + chWidth > maxWidth) {
                        outLines.push({ text: piece, width: pieceWidth });
                        piece = '';
                        pieceWidth = 0;
                    }

                    piece += ch;
                    pieceWidth += chWidth;
                }

                current = piece;
                currentWidth = pieceWidth;

                continue;
            }

            current = candidate;
            currentWidth = candidateWidth;
        }

        flush();
    }

    return { lines: outLines, width: Math.max(0, ...outLines.map(l => l.width)), height: outLines.length * font.lineHeight };
};
