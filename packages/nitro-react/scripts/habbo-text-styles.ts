/**
 * Canonical Habbo text style catalog, transcribed verbatim from the original
 * SWF's text style definitions. This is the single source of truth for
 * `build-text-atlas.mjs` — do not derive these values from `TEXT_STYLES` or
 * infer them; edit this file directly when the source data changes.
 */
export interface HabboTextStyleDef {
    fontFamily: 'Ubuntu' | 'UbuntuCondensed' | 'Volter' | 'Volter Bold';
    fontSize: number;
    bold?: boolean;
    italic?: boolean;
    kerning?: boolean;
    antiAliasType: 'advanced' | 'normal';
    sharpness?: number;
    thickness?: number;
    /** Default tint applied when a caller doesn't override `fill` — not baked into the bitmap. */
    color?: string;
    /** ARGB hex (e.g. '#b2ffffff'); baked directly into the glyph bitmap. */
    etchingColor?: string;
    etchingPosition?: 'bottom';
    underline?: boolean;
}

export const HABBO_TEXT_STYLES: Record<string, HabboTextStyleDef> = {
    u_regular: { fontFamily: 'Ubuntu', fontSize: 12, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_bold: { fontFamily: 'Ubuntu', fontSize: 12, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_italic: { fontFamily: 'Ubuntu', fontSize: 12, italic: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_bold_italic: { fontFamily: 'Ubuntu', fontSize: 12, bold: true, italic: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_small: { fontFamily: 'Ubuntu', fontSize: 10, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_button_tab: { fontFamily: 'Ubuntu', fontSize: 12, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_headline_small: { fontFamily: 'Ubuntu', fontSize: 14, bold: true, kerning: true, antiAliasType: 'advanced' },
    u_headline_medium: { fontFamily: 'Ubuntu', fontSize: 16, bold: true, kerning: true, antiAliasType: 'advanced' },
    u_headline_big: { fontFamily: 'Ubuntu', fontSize: 18, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_frame_title: { fontFamily: 'Ubuntu', fontSize: 12, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_chat_name: { fontFamily: 'Ubuntu', fontSize: 12, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_chat_name_whisper: { fontFamily: 'Ubuntu', fontSize: 12, bold: true, italic: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_chat_speak: { fontFamily: 'Ubuntu', fontSize: 12, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_chat_shout: { fontFamily: 'Ubuntu', fontSize: 12, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_chat_whisper: { fontFamily: 'Ubuntu', fontSize: 12, italic: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    u_tool_tip: { fontFamily: 'Ubuntu', fontSize: 11, color: '#ffffff', kerning: true, antiAliasType: 'advanced' },
    u_tag: { fontFamily: 'Ubuntu', fontSize: 10, italic: true, kerning: true, antiAliasType: 'advanced' },

    ubuntu_condensed_regular: { fontFamily: 'UbuntuCondensed', fontSize: 11, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    ubuntu_condensed_title: { fontFamily: 'UbuntuCondensed', fontSize: 18, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: 200 },

    il_regular: { fontFamily: 'Ubuntu', fontSize: 11, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, etchingColor: '#b2ffffff', etchingPosition: 'bottom' },
    il_regular_white: { fontFamily: 'Ubuntu', fontSize: 11, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    il_small: { fontFamily: 'Ubuntu', fontSize: 9, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, etchingColor: '#b2ffffff', etchingPosition: 'bottom' },
    il_small_white: { fontFamily: 'Ubuntu', fontSize: 9, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    il_heading_title: { fontFamily: 'Ubuntu', fontSize: 18, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, etchingColor: '#b2ffffff', etchingPosition: 'bottom' },
    il_heading_1: { fontFamily: 'Ubuntu', fontSize: 14, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, etchingColor: '#b2ffffff', etchingPosition: 'bottom' },
    il_heading_2: { fontFamily: 'Ubuntu', fontSize: 12, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, etchingColor: '#b2ffffff', etchingPosition: 'bottom' },
    il_heading_3: { fontFamily: 'Ubuntu', fontSize: 10, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, etchingColor: '#b2ffffff', etchingPosition: 'bottom' },
    il_button: { fontFamily: 'Ubuntu', fontSize: 10, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, etchingColor: '#b2ffffff', etchingPosition: 'bottom' },
    il_border: { fontFamily: 'Ubuntu', fontSize: 10, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, etchingColor: '#b2ffffff', etchingPosition: 'bottom' },
    il_frame_title: { fontFamily: 'Ubuntu', fontSize: 10, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, etchingColor: '#b2ffffff', etchingPosition: 'bottom' },
    il_frame_modal_title: { fontFamily: 'Ubuntu', fontSize: 24, bold: true, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    il_link_regular: { fontFamily: 'Ubuntu', fontSize: 11, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, etchingColor: '#b2ffffff', etchingPosition: 'bottom', underline: true },
    il_link_strong: { fontFamily: 'Ubuntu', fontSize: 11, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, etchingColor: '#b2ffffff', etchingPosition: 'bottom', underline: true },

    id_regular: { fontFamily: 'Ubuntu', fontSize: 11, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    id_small: { fontFamily: 'Ubuntu', fontSize: 9, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    id_heading_title: { fontFamily: 'Ubuntu', fontSize: 18, bold: true, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    id_heading_1: { fontFamily: 'Ubuntu', fontSize: 14, bold: true, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    id_heading_2: { fontFamily: 'Ubuntu', fontSize: 12, bold: true, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    id_heading_3: { fontFamily: 'Ubuntu', fontSize: 10, bold: true, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    id_button: { fontFamily: 'Ubuntu', fontSize: 10, bold: true, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    id_border: { fontFamily: 'Ubuntu', fontSize: 10, bold: true, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    id_frame_title: { fontFamily: 'UbuntuCondensed', fontSize: 12, bold: true, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    id_frame_modal_title: { fontFamily: 'Ubuntu', fontSize: 24, bold: true, color: '#ffffff', kerning: true, antiAliasType: 'advanced' },
    id_link_regular: { fontFamily: 'Ubuntu', fontSize: 11, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, underline: true },
    id_link_strong: { fontFamily: 'Ubuntu', fontSize: 11, bold: true, color: '#ffffff', kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15, underline: true },

    regular: { fontFamily: 'Volter', fontSize: 9, antiAliasType: 'normal' },
    italic: { fontFamily: 'Volter', fontSize: 9, italic: true, antiAliasType: 'normal' },
    bold: { fontFamily: 'Volter Bold', fontSize: 9, antiAliasType: 'normal' },
    small: { fontFamily: 'Volter', fontSize: 9, antiAliasType: 'normal' },
    bold_italic: { fontFamily: 'Volter Bold', fontSize: 9, italic: true, antiAliasType: 'normal' },
    button_regular: { fontFamily: 'Volter', fontSize: 9, antiAliasType: 'normal' },
    button_bold: { fontFamily: 'Volter Bold', fontSize: 9, antiAliasType: 'normal' },
    button_shiny_regular: { fontFamily: 'Ubuntu', fontSize: 12, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    button_shiny_bold: { fontFamily: 'Ubuntu', fontSize: 12, bold: true, kerning: true, antiAliasType: 'advanced', sharpness: 80, thickness: -15 },
    button_tab: { fontFamily: 'Volter', fontSize: 9, antiAliasType: 'normal' },
    frame_title: { fontFamily: 'Volter Bold', fontSize: 9, color: '#ffffff', antiAliasType: 'normal' },
    headline_big: { fontFamily: 'Volter Bold', fontSize: 18, antiAliasType: 'normal' },
    headline_medium: { fontFamily: 'Volter Bold', fontSize: 9, antiAliasType: 'normal' },
    headline_small: { fontFamily: 'Volter Bold', fontSize: 9, antiAliasType: 'normal' },
    chat_name: { fontFamily: 'Volter Bold', fontSize: 9, antiAliasType: 'normal' },
    chat_speak: { fontFamily: 'Volter', fontSize: 9, antiAliasType: 'normal' },
    chat_shout: { fontFamily: 'Volter Bold', fontSize: 9, antiAliasType: 'normal' },
    chat_whisper: { fontFamily: 'Volter', fontSize: 9, antiAliasType: 'normal' },
    tool_tip: { fontFamily: 'Volter', fontSize: 9, color: '#ffffff', antiAliasType: 'normal' },
    tag: { fontFamily: 'Volter', fontSize: 9, antiAliasType: 'normal' },
};
