/**
 * Not Flash's: `htmlText` markup for the browser's canvas text, the fallback `ThemeText` draws a face
 * the captured Flash fonts do not have with (`fontFamily: 'Ubuntu'` over a layout's style). Pixi's
 * canvas text takes rich text only as `tagStyles`, tags with no attributes, so each run of the parsed
 * markup (`parseFlashTextMarkup`) becomes a tag of its own whose style is what the run changes - bold,
 * italic, colour, size - and the run's text its content. Underline is not a canvas text style: its
 * runs are marked (`NATIVE_UNDERLINE`) for the caller to draw a line under.
 *
 * Kept free of runtime imports beyond the markup parser, so a test can run it under Node.
 */
import { DEFAULT_FLASH_TEXT_FORMAT, FlashTextFormat } from '../font/flash-text/flashTextFormat';
import { parseFlashTextMarkup } from '../font/flash-text/flashTextMarkup';

/** The key a run's tag style carries when the run is underlined (Pixi's `assign` keeps it on the merged style). */
export const NATIVE_UNDERLINE = '__nitroUnderline';

/** What a tag gives the canvas text: Pixi `TextStyleOptions` keys, and the underline mark. */
export type NativeTagStyle = { fontWeight?: 'bold'; fontStyle?: 'italic'; fill?: string; fontSize?: number; [NATIVE_UNDERLINE]?: true };

export interface NativeMarkup {
    /** The text with each styled run in a tag of its own (`<r0>...</r0>`). */
    text: string;
    /** By tag name: what its run changes. Empty when no run changes anything. */
    tagStyles: Record<string, NativeTagStyle>;
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
    const runs = parseFlashTextMarkup(markup, BASE);
    const tagStyles: Record<string, NativeTagStyle> = {};
    let text = '';

    for (const { text: runText, format } of runs) {
        const style: NativeTagStyle = {
            ...(format.bold && { fontWeight: 'bold' }),
            ...(format.italic && { fontStyle: 'italic' }),
            ...((format.color !== UNSET) && { fill: cssColor(format.color) }),
            ...((format.fontSize > 0) && { fontSize: format.fontSize }),
            ...(format.underline && { [NATIVE_UNDERLINE]: true as const }),
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

    return { text, tagStyles };
};
