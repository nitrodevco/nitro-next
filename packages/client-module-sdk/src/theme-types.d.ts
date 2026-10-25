/**
 * The client's theme components a module draws with, typed with the props a module passes. The
 * client's components take more (a ported Flash layout's every attribute); these are the ones a
 * module's own window needs, and `clientModuleSdk.check.ts` in nitro-react checks that each of them
 * is still a prop the client's component takes, with a type it accepts.
 */
import type { ComponentType, ReactNode } from 'react';

/** An offset or spacing: pixels or a percentage. */
export type ClientModuleLength = number | `${number}%`;

/** A size: pixels, a percentage, or `auto`. */
export type ClientModuleSize = ClientModuleLength | 'auto';

/** A box's layout (Yoga flexbox, as the client's `@pixi/layout` reads it). */
export interface ClientModuleLayout {
    width?: ClientModuleSize;
    height?: ClientModuleSize;
    minWidth?: ClientModuleLength;
    minHeight?: ClientModuleLength;
    maxWidth?: ClientModuleLength;
    maxHeight?: ClientModuleLength;
    position?: 'relative' | 'absolute';
    top?: ClientModuleLength;
    left?: ClientModuleLength;
    right?: ClientModuleLength;
    bottom?: ClientModuleLength;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    flexGrow?: number;
    flexShrink?: number;
    flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    gap?: number;
    padding?: number;
    paddingTop?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingBottom?: number;
    margin?: number;
    marginTop?: number;
    marginLeft?: number;
    marginRight?: number;
    marginBottom?: number;
}

/** A press on a themed element; the event is Pixi's. */
export type ClientModulePointerHandler = (event: never) => void;

export interface ClientModulePointerProps {
    onPointerTap?: ClientModulePointerHandler;
    onPointerDown?: ClientModulePointerHandler;
    onPointerUp?: ClientModulePointerHandler;
    onPointerOver?: ClientModulePointerHandler;
    onPointerOut?: ClientModulePointerHandler;
}

export interface ClientModuleBoxProps extends ClientModulePointerProps {
    layout?: ClientModuleLayout;
    children?: ReactNode;
}

export interface ClientModuleButtonProps extends ClientModulePointerProps {
    /** The theme's button variant: `'101'` is the plain button. */
    variant?: string;
    layout?: ClientModuleLayout;
    disabled?: boolean;
    children?: ReactNode;
}

export interface ClientModuleFrameProps {
    /** Unique across the client: `<module key>-<window id>` is a safe choice. */
    id?: string;
    /**
     * The theme's frame variant: `'3'` is the usual window. `'none'` draws no frame - no skin, header,
     * scaler or crop - and the window is dragged by any press its content does not take (or by a
     * `Region dragTrigger` in it), raised and remembered like any other.
     */
    variant?: string;
    caption?: string;
    centered?: boolean;
    /** Which way its scaler resizes it: `'none'` for a window of a fixed size. */
    resizeDirection?: 'none' | 'x' | 'y' | 'all';
    defaultPosition?: { x: number; y: number };
    rememberPosition?: boolean;
    onClose?: () => void;
    /** Whether it can be dragged at all (its header, or anywhere when frameless). */
    draggable?: boolean;
    layout?: ClientModuleLayout;
    contentLayout?: ClientModuleLayout;
    /**
     * Panes of the window beside it - a second `Frame` - placed against its top left and not cropped
     * by it: they move, raise and close with it, and a pane's header drags it. Behind the window's art
     * unless `panesInFront`.
     */
    panes?: ReactNode;
    panesInFront?: boolean;
    children?: ReactNode;
}

export interface ClientModuleRegionProps extends ClientModulePointerProps {
    /** `#rrggbb`. */
    backgroundColor?: string;
    /** A press on it drags the window it is in (a frameless window's own drag bar). */
    dragTrigger?: boolean;
    layout?: ClientModuleLayout;
    children?: ReactNode;
}

/** The client's text styles (Habbo's own `styles.css`): `u_regular` is the usual window text. */
export type ClientModuleTextStyle =
    | 'u_regular'
    | 'u_bold'
    | 'u_italic'
    | 'u_bold_italic'
    | 'u_small'
    | 'u_button_tab'
    | 'u_headline_small'
    | 'u_headline_medium'
    | 'u_headline_big'
    | 'u_frame_title'
    | 'u_chat_name'
    | 'u_chat_name_whisper'
    | 'u_chat_speak'
    | 'u_chat_shout'
    | 'u_chat_whisper'
    | 'u_tool_tip'
    | 'u_tag'
    | 'ubuntu_condensed_regular'
    | 'ubuntu_condensed_title'
    | 'il_regular'
    | 'il_regular_white'
    | 'il_small'
    | 'il_small_white'
    | 'il_heading_title'
    | 'il_heading_1'
    | 'il_heading_2'
    | 'il_heading_3'
    | 'il_button'
    | 'il_button_white'
    | 'il_border'
    | 'il_frame_title'
    | 'il_frame_title_white'
    | 'il_frame_modal_title'
    | 'il_link_regular'
    | 'il_link_strong'
    | 'id_regular'
    | 'id_small'
    | 'id_heading_title'
    | 'id_heading_1'
    | 'id_heading_2'
    | 'id_heading_3'
    | 'id_button'
    | 'id_border'
    | 'id_frame_title'
    | 'id_frame_modal_title'
    | 'id_link_regular'
    | 'id_link_strong'
    | 'regular'
    | 'italic'
    | 'bold'
    | 'small'
    | 'bold_italic'
    | 'button_regular'
    | 'button_bold'
    | 'button_shiny_regular'
    | 'button_shiny_regular_white'
    | 'button_shiny_bold'
    | 'button_shiny_bold_white'
    | 'button_tab'
    | 'frame_title'
    | 'headline_big'
    | 'headline_medium'
    | 'headline_small'
    | 'chat_name'
    | 'chat_speak'
    | 'chat_shout'
    | 'chat_whisper'
    | 'tool_tip'
    | 'tag';

/** A text's own face, size, colour and wrapping over its style's. */
export interface ClientModuleTextOptions {
    fontFamily?: string;
    fontSize?: number;
    /** `#rrggbb`. */
    fill?: string;
    align?: 'left' | 'center' | 'right';
    wordWrap?: boolean;
    wordWrapWidth?: number;
}

export interface ClientModuleThemeTextProps {
    text: string;
    textStyle?: ClientModuleTextStyle;
    textOptions?: ClientModuleTextOptions;
    /** `text` is Flash `htmlText`: `<b>`, `<i>`, `<u>`, `<font color>`, `<br>`, `<a href>`, in any face. */
    markup?: boolean;
    /** With `markup`: a click on a link's glyphs (Habbo's own faces). */
    onLink?: (link: string) => void;
    layout?: ClientModuleLayout;
}

export interface ClientModuleRichTextProps {
    /**
     * HTML - paragraphs, headings, lists, line breaks, pictures, bold, italic, underline, colour and
     * links are drawn; nothing else is kept and nothing of it runs (`docs/client-modules.md`).
     */
    html: string;
    /** What the text wraps at and pictures are scaled down to. */
    width: number;
    textStyle?: ClientModuleTextStyle;
    textOptions?: ClientModuleTextOptions;
    /** Picture origins (`https://cdn.example.com`) or hosts besides the page's own. */
    imageHosts?: readonly string[];
    /** What relative links and pictures resolve against: the page's address unless given. */
    baseUrl?: string;
    onLink?: (link: string) => void;
    blockSpacing?: number;
    listIndent?: number;
    layout?: ClientModuleLayout;
}

export interface ClientModuleTemplateWindowProps {
    /** A window template, `<library>/<asset>`. */
    id: string;
    /** What its code does to its named elements: `{ title: { caption: 'Hi' }, ok: { onPointerTap } }`. */
    bindings?: Record<string, Record<string, unknown>>;
    width?: number;
    height?: number;
}

export interface ClientModuleTheme {
    Box: ComponentType<ClientModuleBoxProps>;
    Button: ComponentType<ClientModuleButtonProps>;
    Frame: ComponentType<ClientModuleFrameProps>;
    Region: ComponentType<ClientModuleRegionProps>;
    RichText: ComponentType<ClientModuleRichTextProps>;
    ThemeText: ComponentType<ClientModuleThemeTextProps>;
    TemplateWindow: ComponentType<ClientModuleTemplateWindowProps>;
}
