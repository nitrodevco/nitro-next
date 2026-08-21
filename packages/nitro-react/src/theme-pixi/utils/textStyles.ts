import { TextStyle, type TextStyleOptions } from 'pixi.js';

/**
 * Pixi TextStyle equivalents of theme/utilities.css's text-style-* utility classes
 * (font family via theme/fonts.css's already-loaded @font-face rules + size). Only the
 * keys actually used by a migrated view are listed here — add more as views migrate,
 * following theme/utilities.css as the source of truth for family/size.
 */
const TEXT_STYLES = {
    'text-style-button-regular': { fontFamily: 'Goldfish', fontSize: 9 },
    'text-style-u-bold': { fontFamily: 'UbuntuBold', fontSize: 12 },
} as const satisfies Record<string, TextStyleOptions>;

export type TextStyleKey = keyof typeof TEXT_STYLES;

/** Pixi equivalent of the font-aa utility's `text-shadow: 1px 1px rgba(0,0,0,0.3)`. */
export const FONT_AA_DROP_SHADOW: TextStyleOptions['dropShadow'] = {
    color: 0x000000,
    alpha: 0.3,
    distance: 1,
    blur: 0,
    angle: Math.PI / 4,
};

const cache = new Map<TextStyleKey, TextStyle>();

export const getPixiTextStyle = (key: TextStyleKey, overrides?: TextStyleOptions): TextStyle => {
    if (!overrides) {
        let style = cache.get(key);

        if (!style) {
            style = new TextStyle(TEXT_STYLES[key]);
            cache.set(key, style);
        }

        return style;
    }

    return new TextStyle({ ...TEXT_STYLES[key], ...overrides });
};
