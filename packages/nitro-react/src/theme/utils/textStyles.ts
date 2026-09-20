import { TextDropShadow, TextStyle, TextStyleOptions } from 'pixi.js';

import type { FlashTextFormat, HabboTextStyleName } from '../font/flash-text';
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
 * A theme text style read off `HABBO_TEXT_STYLES[habboKey]` - the family, size, weight, slant and
 * colour the Flash `styles.css` gives it - so the browser fallback cannot drift from the Flash
 * renderer's format.
 */
const habboTextStyle = <K extends HabboTextStyleName>(habboKey: K): { fontFamily: string; fontSize: number; fontWeight?: 'bold'; fontStyle?: 'italic'; color?: string; habboKey: K } => {
    const format: Partial<FlashTextFormat> = HABBO_TEXT_STYLES[habboKey];

    return {
        ...browserFace(format.fontFamily ?? 'Volter', !!format.bold, !!format.italic),
        fontSize: format.fontSize ?? 9,
        ...(format.color !== undefined && { color: `#${format.color.toString(16).padStart(6, '0')}` }),
        habboKey,
    };
};

/**
 * The theme's text styles, each a Flash `styles.css` style by its `habboKey`. Exported (not
 * module-private) so callers can read the same font/size/color data off
 * CSS instead of duplicating this table.
 */
export const TEXT_STYLES = {
    'text-style-regular': habboTextStyle('regular'),
    'text-style-u-regular': habboTextStyle('u_regular'),
    'text-style-u-small': habboTextStyle('u_small'),
    'text-style-u-bold': habboTextStyle('u_bold'),
    'text-style-u-headline-big': habboTextStyle('u_headline_big'),
    'text-style-u-headline-small': habboTextStyle('u_headline_small'),
    'text-style-u-headline-medium': habboTextStyle('u_headline_medium'),
    'text-style-u-italic': habboTextStyle('u_italic'),
    'text-style-u-italic-small': habboTextStyle('u_tag'),
    'text-style-u-tool-tip': habboTextStyle('u_tool_tip'),
    'text-style-u-frame-title': habboTextStyle('u_frame_title'),
    'text-style-button-regular': habboTextStyle('button_regular'),
    'text-style-button-bold': habboTextStyle('button_bold'),
    'text-style-button-shiny-regular': habboTextStyle('button_shiny_regular'),
    'text-style-button-shiny-bold': habboTextStyle('button_shiny_bold'),
    'text-style-button-shiny-regular-white': habboTextStyle('button_shiny_regular_white'),
    'text-style-button-shiny-bold-white': habboTextStyle('button_shiny_bold_white'),
    'text-style-il-regular': habboTextStyle('il_regular'),
    'text-style-il-button': habboTextStyle('il_button'),
    // The `_white` styles are not the black ones recoloured: they drop the etching, which a white `fill` on the black style would keep.
    'text-style-il-button-white': habboTextStyle('il_button_white'),
    'text-style-id-button': habboTextStyle('id_button'),
    'text-style-button-tab': habboTextStyle('button_tab'),
    'text-style-il-frame-title': habboTextStyle('il_frame_title'),
    'text-style-il-frame-title-white': habboTextStyle('il_frame_title_white'),
    'text-style-frame-title': habboTextStyle('frame_title'),
    // Remaining HABBO_TEXT_STYLES entries not yet referenced by any view - kept baked/wired
    // for parity with the catalog even though nothing calls them by this key today.
    'text-style-u-bold-italic': habboTextStyle('u_bold_italic'),
    'text-style-u-button-tab': habboTextStyle('u_button_tab'),
    'text-style-u-chat-name': habboTextStyle('u_chat_name'),
    'text-style-u-chat-name-whisper': habboTextStyle('u_chat_name_whisper'),
    'text-style-u-chat-speak': habboTextStyle('u_chat_speak'),
    'text-style-u-chat-shout': habboTextStyle('u_chat_shout'),
    'text-style-u-chat-whisper': habboTextStyle('u_chat_whisper'),
    // UbuntuCondensed
    'text-style-ubuntu-condensed-regular': habboTextStyle('ubuntu_condensed_regular'),
    'text-style-ubuntu-condensed-title': habboTextStyle('ubuntu_condensed_title'),
    // Item-list panel styles (il_*)
    'text-style-il-regular-white': habboTextStyle('il_regular_white'),
    'text-style-il-small': habboTextStyle('il_small'),
    'text-style-il-small-white': habboTextStyle('il_small_white'),
    'text-style-il-heading-title': habboTextStyle('il_heading_title'),
    'text-style-il-heading-1': habboTextStyle('il_heading_1'),
    'text-style-il-heading-2': habboTextStyle('il_heading_2'),
    'text-style-il-heading-3': habboTextStyle('il_heading_3'),
    'text-style-il-border': habboTextStyle('il_border'),
    'text-style-il-frame-modal-title': habboTextStyle('il_frame_modal_title'),
    'text-style-il-link-regular': habboTextStyle('il_link_regular'),
    'text-style-il-link-strong': habboTextStyle('il_link_strong'),
    // Item-list dialog styles (id_*)
    'text-style-id-regular': habboTextStyle('id_regular'),
    'text-style-id-small': habboTextStyle('id_small'),
    'text-style-id-heading-title': habboTextStyle('id_heading_title'),
    'text-style-id-heading-1': habboTextStyle('id_heading_1'),
    'text-style-id-heading-2': habboTextStyle('id_heading_2'),
    'text-style-id-heading-3': habboTextStyle('id_heading_3'),
    'text-style-id-border': habboTextStyle('id_border'),
    'text-style-id-frame-title': habboTextStyle('id_frame_title'),
    'text-style-id-frame-modal-title': habboTextStyle('id_frame_modal_title'),
    'text-style-id-link-regular': habboTextStyle('id_link_regular'),
    'text-style-id-link-strong': habboTextStyle('id_link_strong'),
    // Volter/Volter (classic client) styles
    'text-style-italic': habboTextStyle('italic'),
    'text-style-bold': habboTextStyle('bold'),
    'text-style-small': habboTextStyle('small'),
    'text-style-bold-italic': habboTextStyle('bold_italic'),
    'text-style-headline-big': habboTextStyle('headline_big'),
    'text-style-headline-medium': habboTextStyle('headline_medium'),
    'text-style-headline-small': habboTextStyle('headline_small'),
    'text-style-chat-name': habboTextStyle('chat_name'),
    'text-style-chat-speak': habboTextStyle('chat_speak'),
    'text-style-chat-shout': habboTextStyle('chat_shout'),
    'text-style-chat-whisper': habboTextStyle('chat_whisper'),
    'text-style-tool-tip': habboTextStyle('tool_tip'),
    'text-style-tag': habboTextStyle('tag'),
} as const satisfies Record<string, TextStyleOptions & { color?: string; habboKey: HabboTextStyleName }>;

export type TextStyleKey = keyof typeof TEXT_STYLES;

/**
 * The Flash client's own name for a theme text style - the key into `HABBO_TEXT_STYLES`, whose
 * format the exact renderer draws it in. Not every entry has one (its literal type only exists
 * on the ones that do), so this is the one place that cast lives.
 */
export const getHabboKey = (key: TextStyleKey): HabboTextStyleName | undefined =>
    (TEXT_STYLES[key] as { habboKey?: HabboTextStyleName }).habboKey;

const cache = new Map<TextStyleKey, TextStyle>();

export const getPixiTextStyle = (key: TextStyleKey, overrides?: TextStyleOptions): TextStyle => {
    const { color, habboKey: _habboKey, ...base } = TEXT_STYLES[key] as TextStyleOptions & { color?: string; habboKey?: HabboTextStyleName };
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
