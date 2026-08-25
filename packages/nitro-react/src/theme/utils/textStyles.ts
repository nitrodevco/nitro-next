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
    'text-style-regular': { fontFamily: 'Goldfish', fontSize: 9, habboKey: 'regular' },
    'text-style-headline-big': { fontFamily: 'UbuntuBold', fontSize: 18, habboKey: 'u_headline_big' },
    'text-style-headline-small': { fontFamily: 'UbuntuBold', fontSize: 14, habboKey: 'u_headline_small' },
    'text-style-headline-medium': { fontFamily: 'UbuntuBold', fontSize: 16, habboKey: 'u_headline_medium' },
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
    // Remaining HABBO_TEXT_STYLES entries not yet referenced by any view - kept baked/wired
    // for parity with the catalog even though nothing calls them by this key today.
    'text-style-u-bold-italic': { fontFamily: 'UbuntuItalicsBold', fontSize: 12, habboKey: 'u_bold_italic' },
    'text-style-u-button-tab': { fontFamily: 'Ubuntu', fontSize: 12, habboKey: 'u_button_tab' },
    'text-style-u-chat-name': { fontFamily: 'UbuntuBold', fontSize: 12, habboKey: 'u_chat_name' },
    'text-style-u-chat-name-whisper': { fontFamily: 'UbuntuItalicsBold', fontSize: 12, habboKey: 'u_chat_name_whisper' },
    'text-style-u-chat-speak': { fontFamily: 'Ubuntu', fontSize: 12, habboKey: 'u_chat_speak' },
    'text-style-u-chat-shout': { fontFamily: 'UbuntuBold', fontSize: 12, habboKey: 'u_chat_shout' },
    'text-style-u-chat-whisper': { fontFamily: 'UbuntuItalics', fontSize: 12, habboKey: 'u_chat_whisper' },
    // UbuntuCondensed (GameUbuntu alias)
    'text-style-ubuntu-condensed-regular': { fontFamily: 'GameUbuntu', fontSize: 11, color: '#ffffff', habboKey: 'ubuntu_condensed_regular' },
    'text-style-ubuntu-condensed-title': { fontFamily: 'GameUbuntu', fontSize: 18, color: '#ffffff', habboKey: 'ubuntu_condensed_title' },
    // Item-list panel styles (il_*)
    'text-style-il-regular-white': { fontFamily: 'Ubuntu', fontSize: 11, color: '#ffffff', habboKey: 'il_regular_white' },
    'text-style-il-small': { fontFamily: 'Ubuntu', fontSize: 9, habboKey: 'il_small' },
    'text-style-il-small-white': { fontFamily: 'Ubuntu', fontSize: 9, color: '#ffffff', habboKey: 'il_small_white' },
    'text-style-il-heading-title': { fontFamily: 'UbuntuBold', fontSize: 18, habboKey: 'il_heading_title' },
    'text-style-il-heading-1': { fontFamily: 'UbuntuBold', fontSize: 14, habboKey: 'il_heading_1' },
    'text-style-il-heading-2': { fontFamily: 'UbuntuBold', fontSize: 12, habboKey: 'il_heading_2' },
    'text-style-il-heading-3': { fontFamily: 'UbuntuBold', fontSize: 10, habboKey: 'il_heading_3' },
    'text-style-il-border': { fontFamily: 'UbuntuBold', fontSize: 10, habboKey: 'il_border' },
    'text-style-il-frame-modal-title': { fontFamily: 'UbuntuBold', fontSize: 24, color: '#ffffff', habboKey: 'il_frame_modal_title' },
    'text-style-il-link-regular': { fontFamily: 'Ubuntu', fontSize: 11, habboKey: 'il_link_regular' },
    'text-style-il-link-strong': { fontFamily: 'UbuntuBold', fontSize: 11, habboKey: 'il_link_strong' },
    // Item-list dialog styles (id_*)
    'text-style-id-regular': { fontFamily: 'Ubuntu', fontSize: 11, color: '#ffffff', habboKey: 'id_regular' },
    'text-style-id-small': { fontFamily: 'Ubuntu', fontSize: 9, color: '#ffffff', habboKey: 'id_small' },
    'text-style-id-heading-title': { fontFamily: 'UbuntuBold', fontSize: 18, color: '#ffffff', habboKey: 'id_heading_title' },
    'text-style-id-heading-1': { fontFamily: 'UbuntuBold', fontSize: 14, color: '#ffffff', habboKey: 'id_heading_1' },
    'text-style-id-heading-2': { fontFamily: 'UbuntuBold', fontSize: 12, color: '#ffffff', habboKey: 'id_heading_2' },
    'text-style-id-heading-3': { fontFamily: 'UbuntuBold', fontSize: 10, color: '#ffffff', habboKey: 'id_heading_3' },
    'text-style-id-border': { fontFamily: 'UbuntuBold', fontSize: 10, color: '#ffffff', habboKey: 'id_border' },
    'text-style-id-frame-title': { fontFamily: 'GameUbuntu', fontSize: 12, color: '#ffffff', habboKey: 'id_frame_title' },
    'text-style-id-frame-modal-title': { fontFamily: 'UbuntuBold', fontSize: 24, color: '#ffffff', habboKey: 'id_frame_modal_title' },
    'text-style-id-link-regular': { fontFamily: 'Ubuntu', fontSize: 11, color: '#ffffff', habboKey: 'id_link_regular' },
    'text-style-id-link-strong': { fontFamily: 'UbuntuBold', fontSize: 11, color: '#ffffff', habboKey: 'id_link_strong' },
    // Volter/Goldfish (classic client) styles
    'text-style-italic': { fontFamily: 'Goldfish', fontSize: 9, fontStyle: 'italic', habboKey: 'italic' },
    'text-style-bold': { fontFamily: 'GoldfishBold', fontSize: 9, habboKey: 'bold' },
    'text-style-small': { fontFamily: 'Goldfish', fontSize: 9, habboKey: 'small' },
    'text-style-bold-italic': { fontFamily: 'GoldfishBold', fontSize: 9, fontStyle: 'italic', habboKey: 'bold_italic' },
    'text-style-v-headline-big': { fontFamily: 'GoldfishBold', fontSize: 18, habboKey: 'headline_big' },
    'text-style-v-headline-medium': { fontFamily: 'GoldfishBold', fontSize: 9, habboKey: 'headline_medium' },
    'text-style-v-headline-small': { fontFamily: 'GoldfishBold', fontSize: 9, habboKey: 'headline_small' },
    'text-style-chat-name': { fontFamily: 'GoldfishBold', fontSize: 9, habboKey: 'chat_name' },
    'text-style-chat-speak': { fontFamily: 'Goldfish', fontSize: 9, habboKey: 'chat_speak' },
    'text-style-chat-shout': { fontFamily: 'GoldfishBold', fontSize: 9, habboKey: 'chat_shout' },
    'text-style-chat-whisper': { fontFamily: 'Goldfish', fontSize: 9, habboKey: 'chat_whisper' },
    'text-style-tool-tip': { fontFamily: 'Goldfish', fontSize: 9, color: '#ffffff', habboKey: 'tool_tip' },
    'text-style-tag': { fontFamily: 'Goldfish', fontSize: 9, habboKey: 'tag' },
} as const satisfies Record<string, TextStyleOptions & { color?: string; habboKey?: HabboStyleKey }>;

export type TextStyleKey = keyof typeof TEXT_STYLES;

/** Not every `TEXT_STYLES` entry has a `habboKey` (its literal type only exists on the ones
 *  that do), so a plain `TEXT_STYLES[key].habboKey` access doesn't type-check across the
 *  whole union - this is the one place that cast lives. */
export const getHabboKey = (key: TextStyleKey): HabboStyleKey | undefined =>
    (TEXT_STYLES[key] as { habboKey?: HabboStyleKey }).habboKey;

/** Every `habboKey` currently wired into `TEXT_STYLES` - passed to `preloadBitmapFonts`
 *  at boot so all of them are already warm before anything first renders (see that
 *  function's own docblock for why the alternative - loading on first use - risks a
 *  layout desync, not just a visual flash). */
export const WIRED_HABBO_KEYS: HabboStyleKey[] = Object.values(TEXT_STYLES)
    .map(style => (style as { habboKey?: HabboStyleKey }).habboKey)
    .filter((key): key is HabboStyleKey => !!key);

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
