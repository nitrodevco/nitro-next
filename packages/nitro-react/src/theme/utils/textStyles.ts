import { TextDropShadow, TextStyle, TextStyleOptions } from 'pixi.js';

import type { FlashTextFace, FlashTextFieldOverrides, FlashTextFormat, HabboTextStyleName } from '../font/flash-text';
import { HABBO_TEXT_STYLES } from '../font/flash-text/habboTextStyles';

/** Default drop-shadow shape a bare `dropShadow: true` (no explicit config) resolves to -
 *  see `ThemeText.tsx`'s `resolveDropShadow`. */
export type TextVerticalAlign = 'top' | 'middle' | 'bottom';

/** `objectPosition` (Pixi) / `object-position` (DOM canvas) for a text sitting inside a box larger than it. */
export const textObjectPosition = (align: TextStyleOptions['align'] | undefined, verticalAlign: TextVerticalAlign | undefined): `${'left' | 'center' | 'right'} ${'top' | 'center' | 'bottom'}` => {
    const horizontal = align === 'center' ? 'center' : align === 'right' ? 'right' : 'left';
    const vertical = verticalAlign === 'top' ? 'top' : verticalAlign === 'bottom' ? 'bottom' : 'center';

    return `${horizontal} ${vertical}`;
};

export const TEXT_DROP_SHADOW: TextDropShadow = {
    alpha: 0.3,
    angle: Math.PI / 4,
    blur: 0,
    color: 0x000000,
    distance: 1,
};

/**
 * The browser-text face for a Flash text style. `flashFonts.ts` gives Ubuntu's weights
 * and slants single-face aliases, which Pixi's canvas text names directly; `Volter Bold` has its
 * own; the rest take `fontWeight` / `fontStyle` on their one face.
 */
const browserFace = (fontFamily: string, bold: boolean, italic: boolean): { fontFamily: string; fontWeight?: 'bold'; fontStyle?: 'italic' } => {
    if (fontFamily === 'Ubuntu' && (bold || italic)) return { fontFamily: `Ubuntu${bold ? 'Bold' : ''}${italic ? 'Italics' : ''}` };
    if (fontFamily === 'Volter Bold') return { fontFamily: 'VolterBold', ...(italic && { fontStyle: 'italic' }) };

    return { fontFamily, ...(bold && { fontWeight: 'bold' }), ...(italic && { fontStyle: 'italic' }) };
};

/**
 * `browserFace` read backwards: every face a raw `textOptions.fontFamily` can name, by the alias
 * the table above hands Pixi's canvas text, and the Flash family plus weight and slant it is.
 */
const FLASH_FACES: Readonly<Record<string, FlashTextFace>> = {
    Ubuntu: { fontFamily: 'Ubuntu', bold: false, italic: false },
    UbuntuBold: { fontFamily: 'Ubuntu', bold: true, italic: false },
    UbuntuItalics: { fontFamily: 'Ubuntu', bold: false, italic: true },
    UbuntuBoldItalics: { fontFamily: 'Ubuntu', bold: true, italic: true },
    UbuntuCondensed: { fontFamily: 'UbuntuCondensed', bold: false, italic: false },
    Volter: { fontFamily: 'Volter', bold: false, italic: false },
    VolterBold: { fontFamily: 'Volter Bold', bold: false, italic: false },
    'Volter Bold': { fontFamily: 'Volter Bold', bold: false, italic: false },
};

/**
 * The captured face a raw `fontFamily` override asks for, so the override can be folded into the
 * named style's Flash format instead of dropping the text to the browser's canvas. `undefined`
 * for a family none of `FLASH_FONT_FACES` covers - that one has no exact rendering.
 */
export const flashFaceOverride = (fontFamily: TextStyleOptions['fontFamily']): FlashTextFace | undefined =>
    (typeof fontFamily === 'string') ? FLASH_FACES[fontFamily] : undefined;

/** A theme text style as Pixi's canvas text needs it - the browser-side fallback for a style
 *  whose Flash format the exact renderer cannot take (see `ThemeText`). */
export interface ThemeTextStyle {
    fontFamily: string;
    fontSize: number;
    fontWeight?: 'bold';
    fontStyle?: 'italic';
    color?: string;
}

/**
 * A theme text style read off `HABBO_TEXT_STYLES[habboKey]` - the family, size, weight, slant and
 * colour the Flash `styles.css` gives it - so the browser fallback cannot drift from the Flash
 * renderer's format.
 */
const habboTextStyle = (habboKey: HabboTextStyleName): ThemeTextStyle => {
    const format: Partial<FlashTextFormat> = HABBO_TEXT_STYLES[habboKey];

    return {
        ...browserFace(format.fontFamily ?? 'Volter', !!format.bold, !!format.italic),
        fontSize: format.fontSize ?? 9,
        ...(format.color !== undefined && { color: `#${format.color.toString(16).padStart(6, '0')}` }),
    };
};

/**
 * A theme text style is named the way the Flash client names it - `u_regular`, `il_button`,
 * `id_heading_1`. That one spelling is the key of `HABBO_TEXT_STYLES` (the format the exact
 * renderer draws from), the `textStyle` prop a view passes, and the value a window layout's
 * `text_style` var carries, so a style cannot be named two ways and drift between them.
 */
export type TextStyleKey = HabboTextStyleName;

/**
 * Every Flash style as the browser-text fallback needs it. Derived from `HABBO_TEXT_STYLES`
 * rather than listed: a style added to that generated table is a theme style the moment it lands,
 * and one that leaves cannot be left behind here.
 */
export const TEXT_STYLES = Object.fromEntries(
    (Object.keys(HABBO_TEXT_STYLES) as TextStyleKey[]).map(key => [ key, habboTextStyle(key) ]),
) as Readonly<Record<TextStyleKey, ThemeTextStyle>>;

/**
 * The browser-text face for a style once the layout's own `font_face`, `bold` and `italic` vars
 * are applied over it - what the canvas-text fallback needs when the exact renderer cannot take
 * the string. A face alias adds its weight and slant rather than clearing them, the way
 * `font_face` does in Flash.
 */
export const browserFaceOverride = (textStyle: TextStyleKey, face: FlashTextFace | undefined, field: FlashTextFieldOverrides | undefined): { fontFamily: string; fontWeight?: 'bold'; fontStyle?: 'italic' } => {
    const style: Partial<FlashTextFormat> = HABBO_TEXT_STYLES[textStyle];

    return browserFace(
        face?.fontFamily ?? style.fontFamily ?? 'Volter',
        field?.bold ?? (face?.bold || !!style.bold),
        field?.italic ?? (face?.italic || !!style.italic),
    );
};

/** What a text with no style of its own draws in - `TextStyleManager.getStyle("regular")`, the
 *  style `TextController.setTextFormatting` falls back to when the field names none. */
export const DEFAULT_TEXT_STYLE: TextStyleKey = 'regular';

/**
 * The style a window of this `style` id starts its text from. `TextController`'s constructor
 * takes its style name from `ThemeManager.getPropertyDefaults(style)` - the property defaults of
 * the first real theme covering that id - and the three real themes name different ones:
 *
 * | theme | style ids | default `text_style` |
 * |---|---|---|
 * | Volter | 0-2 | `regular` |
 * | Ubuntu | 3-7 | `u_regular` |
 * | Illumina Light / Dark | 100-199 / 200-299 | `il_regular` |
 * | Misc | 10000-10007 | `u_regular` |
 *
 * A theme variant that names no style of its own takes this rather than `regular`, so an Ubuntu
 * frame's caption is Ubuntu 12 and an illumina one's is etched, the way the client draws them.
 */
export const themeDefaultTextStyle = (style: string | number | undefined): TextStyleKey => {
    const id = Number(style);

    if (!Number.isFinite(id)) return DEFAULT_TEXT_STYLE;

    if ((id >= 3 && id < 8) || (id >= 10000 && id < 10008)) return 'u_regular';

    if (id >= 100 && id < 300) return 'il_regular';

    return DEFAULT_TEXT_STYLE;
};

const cache = new Map<TextStyleKey, TextStyle>();

export const getPixiTextStyle = (key: TextStyleKey, overrides?: TextStyleOptions): TextStyle => {
    const { color, ...base } = TEXT_STYLES[key];
    const options: TextStyleOptions = color ? { fill: color, ...base } : base;

    if (!overrides) {
        let style = cache.get(key);

        if (!style) {
            style = new TextStyle(options);
            cache.set(key, style);
        }

        return style;
    }

    return new TextStyle({ ...options, ...overrides });
};
