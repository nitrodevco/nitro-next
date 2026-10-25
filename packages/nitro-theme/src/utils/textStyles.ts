/**
 * The theme's text styles: the Flash style names (`TextStyleKey`), the browser-text face each falls
 * back to (`TEXT_STYLES`, derived from the generated `HABBO_TEXT_STYLES`), the default style of a
 * window's theme (`themeDefaultTextStyle`), and when an override still draws exactly
 * (`resolveFlashStyle`), and what a theme or hotel sets in place of a style (`setTextStyleOverrides`)
 * or of a face a layout names itself (`setFontFaceOverrides`).
 * See docs/text.md.
 */
import { TextDropShadow, TextStyle, TextStyleOptions } from 'pixi.js';

import type { FlashTextFace, FlashTextFieldOverrides, FlashTextFormat, HabboTextStyleName } from '../font/flash-text';
import { DEFAULT_FLASH_TEXT_FORMAT } from '../font/flash-text/flashTextFormat';
import { markTextStylesChanged } from '../font/flash-text/FlashTextRenderer';
import { HABBO_TEXT_STYLES } from '../font/flash-text/habboTextStyles';
import { toCssHexColor } from './cssHexColor';

/** Where a text sits vertically in a box taller than it. */
export type TextVerticalAlign = 'top' | 'middle' | 'bottom';

/** The `objectPosition` of a text sitting inside a box larger than it. */
export const textObjectPosition = (align: TextStyleOptions['align'] | undefined, verticalAlign: TextVerticalAlign | undefined): `${'left' | 'center' | 'right'} ${'top' | 'center' | 'bottom'}` => {
    const horizontal = align === 'center' ? 'center' : align === 'right' ? 'right' : 'left';
    const vertical = verticalAlign === 'top' ? 'top' : verticalAlign === 'bottom' ? 'bottom' : 'center';

    return `${horizontal} ${vertical}`;
};

/** The drop-shadow a bare `dropShadow: true` (no explicit config) resolves to - see `ThemeText`'s `resolveDropShadow`. */
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
        ...(format.color !== undefined && { color: toCssHexColor(format.color) }),
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
 * What a theme or a hotel puts in place of one text style: another style's name, whose format it
 * takes whole (`"u_regular": "regular"` sets the Ubuntu texts in Volter), or the `FlashTextFormat`
 * fields it changes over its own (`{ "fontFamily": "Volter", "fontSize": 9, "antiAliasType": "normal" }`).
 */
export type TextStyleOverride = TextStyleKey | Partial<FlashTextFormat>;

export type TextStyleOverrides = Partial<Record<TextStyleKey, TextStyleOverride>>;

/**
 * Where an override comes from, in the order they apply: `theme` is the window manager bundle's
 * `text-styles.json` - the Habbo client takes its text styles from that library's style sheet
 * (`TextSkinRenderer.parse` hands it to `TextStyleManager.setStyles`), so a theme pack's skin
 * carries its own - and `hotel` the config's `text.styles.overrides`, over it.
 */
export type TextStyleOverrideSource = 'theme' | 'hotel';

const SOURCES: TextStyleOverrideSource[] = [ 'theme', 'hotel' ];

/** The canvas-text styles `getPixiTextStyle` made, by style; dropped when the styles change. */
const cache = new Map<TextStyleKey, TextStyle>();

const SHIPPED_TEXT_STYLES: Readonly<Record<TextStyleKey, Partial<FlashTextFormat>>> = { ...HABBO_TEXT_STYLES };

const textStyleOverrides: Record<TextStyleOverrideSource, TextStyleOverrides> = { theme: {}, hotel: {} };

/** An override table read as it may arrive - an object, or that object as JSON text (a hotel variable) - keeping only known styles and format fields. */
const readTextStyleOverrides = (value: unknown): TextStyleOverrides => {
    if (typeof value === 'string') {
        try {
            value = JSON.parse(value);
        } catch {
            return {};
        }
    }

    if (!value || (typeof value !== 'object') || Array.isArray(value)) return {};

    const overrides: TextStyleOverrides = {};

    for (const [ key, override ] of Object.entries(value as Record<string, unknown>)) {
        if (!(key in SHIPPED_TEXT_STYLES)) continue;

        if (typeof override === 'string') {
            if (override in SHIPPED_TEXT_STYLES) overrides[key as TextStyleKey] = override as TextStyleKey;
        } else if (override && (typeof override === 'object')) {
            overrides[key as TextStyleKey] = Object.fromEntries(Object.entries(override).filter(([ field ]) => field in DEFAULT_FLASH_TEXT_FORMAT));
        }
    }

    return overrides;
};

/**
 * Puts a source's text style overrides in place of the last ones it set (an empty or unreadable
 * table clears them) and rebuilds every style from the client's own: each source over the result
 * of the ones before it, a name taking that style's format as the sources before it left it. Every
 * reader of `HABBO_TEXT_STYLES` and `TEXT_STYLES` sees the new formats; texts already drawn keep
 * the old ones, so a source is set before the views it styles draw - the config's at start-up, the
 * theme's as its bundle loads (`preloadThemeAssets`), before the client leaves the loading screen.
 */
export const setTextStyleOverrides = (source: TextStyleOverrideSource, value: unknown): void => {
    textStyleOverrides[source] = readTextStyleOverrides(value);

    let formats: Record<TextStyleKey, Partial<FlashTextFormat>> = { ...SHIPPED_TEXT_STYLES };

    for (const layer of SOURCES) {
        const previous = formats;

        formats = { ...previous };

        for (const [ key, override ] of Object.entries(textStyleOverrides[layer]) as [ TextStyleKey, TextStyleOverride ][]) {
            formats[key] = (typeof override === 'string') ? previous[override] : { ...previous[key], ...override };
        }
    }

    const styles = HABBO_TEXT_STYLES as Record<TextStyleKey, Partial<FlashTextFormat>>;
    const fallbacks = TEXT_STYLES as Record<TextStyleKey, ThemeTextStyle>;

    for (const key of Object.keys(SHIPPED_TEXT_STYLES) as TextStyleKey[]) {
        styles[key] = formats[key];
        fallbacks[key] = habboTextStyle(key);
    }

    cache.clear();
    markTextStylesChanged();
};

/**
 * What a theme or a hotel draws a face in where a layout names that face itself (a text's `font_face`
 * var, which no text style override reaches): another face as layouts name it (`"Ubuntu": "Volter"`),
 * or the `FlashTextFormat` fields it changes (`{ "fontFamily": "Volter", "fontSize": 9, "antiAliasType": "normal" }`).
 */
export type FontFaceOverride = string | Partial<FlashTextFormat>;

/** By the face as layouts name it - `Ubuntu`, `Ubuntu bold`, `Volter`, `Volter Bold`. */
export type FontFaceOverrides = Record<string, Partial<FlashTextFormat>>;

const fontFaceOverrides: Record<TextStyleOverrideSource, FontFaceOverrides> = { theme: {}, hotel: {} };

/** A face override table read as it may arrive - an object, or that object as JSON text - keeping only faces and format fields. */
const readFontFaceOverrides = (value: unknown): FontFaceOverrides => {
    if (typeof value === 'string') {
        try {
            value = JSON.parse(value);
        } catch {
            return {};
        }
    }

    if (!value || (typeof value !== 'object') || Array.isArray(value)) return {};

    const overrides: FontFaceOverrides = {};

    for (const [ face, override ] of Object.entries(value as Record<string, unknown>)) {
        if (typeof override === 'string') {
            if (override.length) overrides[face] = { fontFamily: override };
        } else if (override && (typeof override === 'object')) {
            overrides[face] = Object.fromEntries(Object.entries(override).filter(([ field ]) => field in DEFAULT_FLASH_TEXT_FORMAT));
        }
    }

    return overrides;
};

/**
 * Puts a source's face overrides in place of the last ones it set (an empty or unreadable table clears
 * them): `theme` the window manager bundle's `text-faces.json`, `hotel` the config's `text.faces.overrides`,
 * whose entry for a face wins over the theme's. Read by the template texts (`templateTextFormat`); like
 * a style override, it is set before the views draw, and a text already drawn keeps its old face.
 */
export const setFontFaceOverrides = (source: TextStyleOverrideSource, value: unknown): void => {
    fontFaceOverrides[source] = readFontFaceOverrides(value);

    markTextStylesChanged();
};

/** The format a theme or hotel draws a layout's `font_face` in, `undefined` when neither changes it. */
export const fontFaceOverride = (face: string): Partial<FlashTextFormat> | undefined => fontFaceOverrides.hotel[face] ?? fontFaceOverrides.theme[face];

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
 * The style the exact renderer draws a text in: a raw `fontFamily` / `fontSize` override is
 * still that style's own Flash format with the face or size swapped in - a Flash layout's
 * `font_face` and `font_size` vars are exactly that, applied over the style the way
 * `TextController.setTextFormatting` applies them - so an override keeps rendering exactly
 * (`useFlashTextCanvas` folds them into the format). `undefined` only for a family none of the
 * captured faces covers, or a non-numeric size; that text falls back to the browser's own.
 *
 * `ThemeText` decides what to draw with this and `TextInput` decides what to measure its caret
 * and selection in with it, so the drawn glyphs and the geometry over them cannot disagree.
 */
export const resolveFlashStyle = (textStyle: TextStyleKey | undefined, textOptions: TextStyleOptions | undefined): TextStyleKey | undefined => {
    if (textOptions?.fontSize !== undefined && typeof textOptions.fontSize !== 'number') return undefined;

    if (textOptions?.fontFamily && !flashFaceOverride(textOptions.fontFamily)) return undefined;

    return textStyle ?? DEFAULT_TEXT_STYLE;
};

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

/** A style as Pixi's canvas text takes it (the browser fallback), with `overrides` over it; the bare style is made once and kept. */
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

    // An override left `undefined` keeps the style's own value: spread as it is, it would replace it
    // (a `fill: undefined` drawing no fill at all).
    const set = Object.fromEntries(Object.entries(overrides).filter(([ , value ]) => value !== undefined)) as TextStyleOptions;

    return new TextStyle({ ...options, ...set });
};
