import { TextStyle, type TextStyleOptions } from 'pixi.js';

/**
 * Pixi TextStyle equivalents of every theme/utilities.css `text-style-*` utility (font
 * family via theme/fonts.css's already-loaded @font-face rules + size, plus the handful
 * of utilities that bake in their own text color). Two DOM classnames referenced by
 * theme/Frame.tsx - `text-style-id-frame-title` (variant '200') and
 * `text-style-il-frame-modal-title` (variant '101') - aren't defined anywhere in
 * utilities.css (dead Tailwind utilities in the DOM source, confirmed absent), so they're
 * intentionally not ported here; those two Frame variants fall back to no special text
 * style, matching what the DOM version actually (fails to) render.
 */
const TEXT_STYLES = {
    'text-style-regular': { fontFamily: 'Goldfish', fontSize: 10.88 },
    'text-style-headline-big': { fontFamily: 'UbuntuBold', fontSize: 18 },
    'text-style-headline-small': { fontFamily: 'UbuntuBold', fontSize: 14 },
    'text-style-u-regular': { fontFamily: 'Ubuntu', fontSize: 12 },
    'text-style-u-small': { fontFamily: 'Ubuntu', fontSize: 10 },
    'text-style-u-bold': { fontFamily: 'UbuntuBold', fontSize: 12 },
    'text-style-u-italic': { fontFamily: 'UbuntuItalics', fontSize: 12 },
    'text-style-u-italic-small': { fontFamily: 'UbuntuItalics', fontSize: 10 },
    'text-style-u-tool-tip': { fontFamily: 'Ubuntu', fontSize: 11, color: '#ffffff' },
    'text-style-u-frame-title': { fontFamily: 'UbuntuBold', fontSize: 12 },
    'text-style-button-regular': { fontFamily: 'Goldfish', fontSize: 9 },
    'text-style-button-bold': { fontFamily: 'GoldfishBold', fontSize: 9 },
    'text-style-button-shiny-regular': { fontFamily: 'Ubuntu', fontSize: 12 },
    'text-style-button-shiny-bold': { fontFamily: 'UbuntuBold', fontSize: 12 },
    'text-style-il-regular': { fontFamily: 'Ubuntu', fontSize: 11 },
    'text-style-il-button': { fontFamily: 'UbuntuBold', fontSize: 10 },
    'text-style-id-button': { fontFamily: 'UbuntuBold', fontSize: 10, color: '#ffffff' },
    'text-style-button-tab': { fontFamily: 'Goldfish', fontSize: 9 },
    'text-style-il-frame-title': { fontFamily: 'UbuntuBold', fontSize: 10 },
    'text-style-frame-title': { fontFamily: 'GoldfishBold', fontSize: 9, color: '#ffffff' },
} as const satisfies Record<string, TextStyleOptions & { color?: string }>;

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
    const { color, ...base } = TEXT_STYLES[key] as TextStyleOptions & { color?: string };
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
