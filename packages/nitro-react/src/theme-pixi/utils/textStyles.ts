import { TextDropShadow, TextStyle, type TextStyleOptions } from 'pixi.js';

const TEXT_DROP_SHADOW: TextDropShadow = {
    alpha: 0.3,
    angle: Math.PI / 4,
    blur: 0,
    color: 0x000000,
    distance: 1
}

const TEXT_STYLES = {
    'text-style-regular': { fontFamily: 'Goldfish', fontSize: 10.88, dropShadow: TEXT_DROP_SHADOW },
    'text-style-headline-big': { fontFamily: 'UbuntuBold', fontSize: 18 },
    'text-style-headline-small': { fontFamily: 'UbuntuBold', fontSize: 14 },
    'text-style-u-regular': { fontFamily: 'Ubuntu', fontSize: 12 },
    'text-style-u-small': { fontFamily: 'Ubuntu', fontSize: 10 },
    'text-style-u-bold': { fontFamily: 'UbuntuBold', fontSize: 12 },
    'text-style-u-italic': { fontFamily: 'UbuntuItalics', fontSize: 12 },
    'text-style-u-italic-small': { fontFamily: 'UbuntuItalics', fontSize: 10 },
    'text-style-u-tool-tip': { fontFamily: 'Ubuntu', fontSize: 11, color: '#ffffff' },
    'text-style-u-frame-title': { fontFamily: 'UbuntuBold', fontSize: 12 },
    'text-style-button-regular': { fontFamily: 'Goldfish', fontSize: 9, dropShadow: TEXT_DROP_SHADOW },
    'text-style-button-bold': { fontFamily: 'GoldfishBold', fontSize: 9, dropShadow: TEXT_DROP_SHADOW },
    'text-style-button-shiny-regular': { fontFamily: 'Ubuntu', fontSize: 12 },
    'text-style-button-shiny-bold': { fontFamily: 'UbuntuBold', fontSize: 12 },
    'text-style-il-regular': { fontFamily: 'Ubuntu', fontSize: 11 },
    'text-style-il-button': { fontFamily: 'UbuntuBold', fontSize: 10 },
    'text-style-id-button': { fontFamily: 'UbuntuBold', fontSize: 10, color: '#ffffff' },
    'text-style-button-tab': { fontFamily: 'Goldfish', fontSize: 9, dropShadow: TEXT_DROP_SHADOW },
    'text-style-il-frame-title': { fontFamily: 'UbuntuBold', fontSize: 10 },
    'text-style-frame-title': { fontFamily: 'GoldfishBold', fontSize: 9, color: '#ffffff', dropShadow: TEXT_DROP_SHADOW },
} as const satisfies Record<string, TextStyleOptions & { color?: string }>;

export type TextStyleKey = keyof typeof TEXT_STYLES;

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
