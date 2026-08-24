import { TextDropShadow, TextStyle, TextStyleOptions } from 'pixi.js';

import type { HABBO_TEXT_STYLES } from '../../../scripts/habbo-text-styles';

/** Default drop-shadow shape a bare `dropShadow: true` (no explicit config) resolves to -
 *  see `ThemeText.tsx`'s `resolveDropShadow`. */
export const TEXT_DROP_SHADOW: TextDropShadow = {
    alpha: 0.3,
    angle: Math.PI / 4,
    blur: 0,
    color: 0x000000,
    distance: 1,
};

/** A key into the baked bitmap atlas (`scripts/habbo-text-styles.ts` /
 *  `public/assets/webfonts/atlas/manifest.json`). Type-only import - erased at
 *  compile time, so this costs nothing at runtime; it just keeps `habboKey`
 *  typo-proof against the real catalog. Omitted on an entry whose family/size/
 *  weight doesn't exactly match a baked combo - `ThemeText` falls back to
 *  today's native rendering for those, unchanged. */
type HabboStyleKey = keyof typeof HABBO_TEXT_STYLES;

/** Exported (not module-private) so `theme/dom/textStyleDom.ts` can translate the same
 *  font/size/color/drop-shadow data to CSS instead of duplicating this table. */
export const TEXT_STYLES = {
    'text-style-regular': { fontFamily: 'Goldfish', fontSize: 10 },
    'text-style-headline-big': { fontFamily: 'UbuntuBold', fontSize: 18, habboKey: 'u_headline_big' },
    'text-style-headline-small': { fontFamily: 'UbuntuBold', fontSize: 14, habboKey: 'u_headline_small' },
    'text-style-u-regular': { fontFamily: 'Ubuntu', fontSize: 12, habboKey: 'u_regular' },
    'text-style-u-small': { fontFamily: 'Ubuntu', fontSize: 10, habboKey: 'u_small' },
    'text-style-u-bold': { fontFamily: 'UbuntuBold', fontSize: 12, habboKey: 'u_bold' },
    'text-style-u-italic': { fontFamily: 'UbuntuItalics', fontSize: 12, habboKey: 'u_italic' },
    'text-style-u-italic-small': { fontFamily: 'UbuntuItalics', fontSize: 10, habboKey: 'u_tag' },
    'text-style-u-tool-tip': { fontFamily: 'Ubuntu', fontSize: 11, color: '#ffffff', habboKey: 'u_tool_tip' },
    'text-style-u-frame-title': { fontFamily: 'UbuntuBold', fontSize: 12, habboKey: 'u_frame_title' },
    'text-style-button-regular': { fontFamily: 'Goldfish', fontSize: 9, habboKey: 'button_regular' },
    'text-style-button-bold': { fontFamily: 'GoldfishBold', fontSize: 9, habboKey: 'button_bold' },
    'text-style-button-shiny-regular': { fontFamily: 'Ubuntu', fontSize: 12, habboKey: 'button_shiny_regular' },
    'text-style-button-shiny-bold': { fontFamily: 'UbuntuBold', fontSize: 12, habboKey: 'button_shiny_bold' },
    'text-style-il-regular': { fontFamily: 'Ubuntu', fontSize: 11, habboKey: 'il_regular' },
    'text-style-il-button': { fontFamily: 'UbuntuBold', fontSize: 10, habboKey: 'il_button' },
    'text-style-id-button': { fontFamily: 'UbuntuBold', fontSize: 10, color: '#ffffff', habboKey: 'id_button' },
    'text-style-button-tab': { fontFamily: 'Goldfish', fontSize: 9, habboKey: 'button_tab' },
    'text-style-il-frame-title': { fontFamily: 'UbuntuBold', fontSize: 10, habboKey: 'il_frame_title' },
    'text-style-frame-title': { fontFamily: 'GoldfishBold', fontSize: 9, color: '#ffffff', habboKey: 'frame_title' },
} as const satisfies Record<string, TextStyleOptions & { color?: string; habboKey?: HabboStyleKey }>;

export type TextStyleKey = keyof typeof TEXT_STYLES;

/** Not every `TEXT_STYLES` entry has a `habboKey` (its literal type only exists on the ones
 *  that do), so a plain `TEXT_STYLES[key].habboKey` access doesn't type-check across the
 *  whole union - this is the one place that cast lives. */
export const getHabboKey = (key: TextStyleKey): HabboStyleKey | undefined =>
    (TEXT_STYLES[key] as { habboKey?: HabboStyleKey }).habboKey;

const cache = new Map<TextStyleKey, TextStyle>();

export const getPixiTextStyle = (key: TextStyleKey, overrides?: TextStyleOptions): TextStyle => {
    const { color, habboKey: _habboKey, ...base } = TEXT_STYLES[key] as TextStyleOptions & { color?: string; habboKey?: HabboStyleKey };
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
