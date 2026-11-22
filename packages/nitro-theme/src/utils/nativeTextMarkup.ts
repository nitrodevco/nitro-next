/**
 * Not Flash's: `htmlText` markup for the browser's canvas text, the fallback `ThemeText` draws a face
 * the captured Flash fonts do not have with (`fontFamily: 'Ubuntu'` over a layout's style). Pixi's
 * canvas text takes rich text only as `tagStyles`, tags with no attributes, so each run of the parsed
 * markup (`parseFlashTextMarkup`) becomes a tag of its own whose style is what the run changes - bold,
 * italic, colour, size - and the run's text its content. Underline is not a canvas text style: its
 * runs are marked (`NATIVE_UNDERLINE`) for the caller to draw a line under, and a link's runs with
 * the link's index (`NATIVE_LINK`) for the caller to take a click on.
 *
 * Kept free of runtime imports beyond the markup parser, so a test can run it under Node.
 */
import { DEFAULT_FLASH_TEXT_FORMAT, FlashTextFormat } from '../font/flash-text/flashTextFormat';
import { parseFlashTextMarkupWithLinks } from '../font/flash-text/flashTextMarkup';

/** The key a run's tag style carries when the run is underlined (Pixi's `assign` keeps it on the merged style). */
export const NATIVE_UNDERLINE = '__nitroUnderline';

/** The key a run's tag style carries when the run is (part of) a link: the link's index in `NativeMarkup.links`. */
export const NATIVE_LINK = '__nitroLink';

/** What a tag gives the canvas text: Pixi `TextStyleOptions` keys, and the underline mark. */
export type NativeTagStyle = { fontWeight?: 'bold'; fontStyle?: 'italic'; fill?: string; fontSize?: number; [NATIVE_UNDERLINE]?: true; [NATIVE_LINK]?: number };

export interface NativeMarkup {
    /** The text with each styled run in a tag of its own (`<r0>...</r0>`). */
    text: string;
    /** By tag name: what its run changes. Empty when no run changes anything. */
    tagStyles: Record<string, NativeTagStyle>;
    /** The `<a href>`s' hrefs, by the index their runs carry (`NATIVE_LINK`); only when the markup has any. */
    links?: string[];
}

/** No colour or size of its own: a run keeps the field's. */
const UNSET = -1;

const BASE: Readonly<FlashTextFormat> = Object.freeze({ ...DEFAULT_FLASH_TEXT_FORMAT, color: UNSET, fontSize: UNSET, bold: false, italic: false, underline: false });

/** `#rrggbb`. */
const cssColor = (color: number) => `#${(color & 0xFFFFFF).toString(16).padStart(6, '0')}`;

/** A `<` that would open one of the run tags, broken with a zero-width space so the text shows as typed. */
const RUN_TAG = /<(\/?r\d+>)/g;

/** `markup`'s text and its runs' styles, for Pixi's canvas text (`TextStyle.tagStyles`). */
export const nativeMarkup = (markup: string): NativeMarkup => {
    const { runs: parsed, links } = parseFlashTextMarkupWithLinks(markup, BASE);
    const tagStyles: Record<string, NativeTagStyle> = {};
    let text = '';
    // A link does not split the parsed runs (it is a range of their text): split them at its ends, so
    // each piece is in one link or none.
    const runs: { text: string; format: FlashTextFormat; link: number }[] = [];
    let offset = 0;

    for (const run of parsed) {
        const cuts = new Set([ 0, run.text.length ]);

        for (const link of links) {
            for (const edge of [ link.start, link.end ]) {
                if (edge > offset && edge < offset + run.text.length) cuts.add(edge - offset);
            }
        }

        const ends = [ ...cuts ].sort((a, b) => a - b);

        for (let index = 1; index < ends.length; index++) {
            const at = offset + ends[index - 1];

            runs.push({ text: run.text.slice(ends[index - 1], ends[index]), format: run.format, link: links.findIndex(link => at >= link.start && at < link.end) });
        }

        offset += run.text.length;
    }

    for (const { text: runText, format, link } of runs) {
        const style: NativeTagStyle = {
            ...(format.bold && { fontWeight: 'bold' }),
            ...(format.italic && { fontStyle: 'italic' }),
            ...((format.color !== UNSET) && { fill: cssColor(format.color) }),
            ...((format.fontSize > 0) && { fontSize: format.fontSize }),
            ...(format.underline && { [NATIVE_UNDERLINE]: true as const }),
            ...((link >= 0) && { [NATIVE_LINK]: link }),
        };
        const safe = runText.replace(RUN_TAG, '<​$1');

        if (!Object.keys(style).length || !runText.length) {
            text += safe;

            continue;
        }

        const tag = `r${Object.keys(tagStyles).length}`;

        tagStyles[tag] = style;
        text += `<${tag}>${safe}</${tag}>`;
    }

    return links.length ? { text, tagStyles, links: links.map(link => link.href) } : { text, tagStyles };
};
