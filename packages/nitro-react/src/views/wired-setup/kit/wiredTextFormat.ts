/**
 * Turns a wired style's text template (`text_view`, `text_bold_view`, `text_html`, the input's
 * `field`) plus the per-text overrides of `TextParam` into a Flash text format, and does the
 * two pieces of `ITextWindow` behaviour the presets rely on: `overflowReplace = "..."` and
 * `maxLines`.
 *
 * The templates cannot all be named by a `textStyle` key alone: illumina's bold text is
 * `il_regular` with the `bold` variable set, and `TextParam` overrides the font size, the colour
 * and the underline per text. The format starts from the key's Flash style and applies those on
 * top, so the text is still drawn by the exact renderer.
 */
import { FLASH_TEXT_GUTTER, FlashTextFormat, FlashTextRenderer, HABBO_TEXT_STYLES, layoutFlashTextBlock, normalizeFlashTextFormat } from '#base/theme';
import { WiredStyleTextTemplate } from '#base/wired';

export interface WiredTextOverrides {
    /** `TextParam.textColor` - a CSS `#rrggbb`. */
    color?: string | null;
    /** `TextParam.fontSize`. */
    fontSize?: number;
    /** `TextParam.underline`. */
    underline?: boolean;
}

const OVERFLOW_REPLACE = '...';

const parseColor = (color: string): number => parseInt(color.replace('#', ''), 16) & 0xFFFFFF;

/** Rec. 601 luma, 0 to 1. */
const luma = (color: number): number => (((color >> 16) & 0xFF) * 0.299 + ((color >> 8) & 0xFF) * 0.587 + (color & 0xFF) * 0.114) / 255;

export const wiredTextFormat = (template: WiredStyleTextTemplate, { color, fontSize, underline }: WiredTextOverrides = {}): FlashTextFormat => {
    const resolvedColor = color ?? template.color;
    const format = normalizeFlashTextFormat({
        ...HABBO_TEXT_STYLES[template.textStyle],
        ...(template.bold ? { bold: true } : {}),
        ...((fontSize !== undefined && fontSize > 0) ? { fontSize } : {}),
        ...(underline ? { underline: true } : {}),
        ...(resolvedColor ? { color: parseColor(resolvedColor) } : {}),
    });

    // The il_* etching is a translucent white line made for dark text on a light panel; under a
    // light colour it reads as a smear, and Flash has separate un-etched styles for that.
    if ((format.etchingColor !== null) && (luma(format.color) > 0.6)) return { ...format, etchingColor: null, etchingPosition: null };

    return format;
};

/** The field width a single line of `text` needs, gutters included; `null` when the exact renderer cannot measure it. */
export const measureWiredText = (text: string, format: FlashTextFormat): number | null => {
    const width = FlashTextRenderer.measure(text, format);

    return (width === null) ? null : (Math.ceil(width) + (FLASH_TEXT_GUTTER * 2));
};

/** `overflowReplace = "..."` - the longest start of `text` that fits `fieldWidth` with the dots appended. */
export const truncateWiredText = (text: string, format: FlashTextFormat, fieldWidth: number): string => {
    const full = measureWiredText(text, format);

    if ((full === null) || (full <= fieldWidth)) return text;

    let low = 0;
    let high = text.length;

    while (low < high) {
        const middle = Math.ceil((low + high) / 2);
        const width = measureWiredText(text.substring(0, middle) + OVERFLOW_REPLACE, format);

        if ((width !== null) && (width <= fieldWidth)) low = middle;
        else high = middle - 1;
    }

    return text.substring(0, low) + OVERFLOW_REPLACE;
};

/** `maxLines` - the text cut to the lines it may show once wrapped to `wrapWidth`; 0 or less means no limit. */
export const limitWiredTextLines = (text: string, format: FlashTextFormat, wrapWidth: number, maxLines: number): string => {
    if (maxLines <= 0) return text;

    const lines = layoutFlashTextBlock(text, format, { wordWrap: true, wrapWidth, breakWords: true });

    if (!lines || (lines.length <= maxLines)) return text;

    return lines.slice(0, maxLines).map(line => line.text).join('\n');
};
