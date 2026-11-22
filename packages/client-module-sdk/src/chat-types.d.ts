/**
 * The configuration value `chat.bubbles`: a theme's look for the room's chat bubbles, which a plugin
 * sets beside its other variables (`docs/client-modules.md`, "Chat bubbles"). Read once at boot;
 * everything left out is Habbo's own. `clientModuleSdk.check.ts` in nitro-react checks that it is the
 * type the client reads.
 */

export interface ClientModuleChatRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ClientModuleChatPoint {
    x: number;
    y: number;
}

/** A chat style's reg points, as its `chat_definition.json` has them. */
export interface ClientModuleChatRegPoints {
    scale9: ClientModuleChatRect;
    pointerY?: number;
    pointerXMargins?: number[];
    faceXY?: ClientModuleChatPoint;
    colorXY?: ClientModuleChatPoint;
    anonymous?: boolean;
    textFieldMargins: ClientModuleChatRect;
    textColorRGB?: number;
    fontFace?: string;
    fontSize?: number;
    /** How far neighbouring bubbles may overlap this one (left, top, right, bottom): the bubbles' spacing. */
    overlapRect?: ClientModuleChatRect;
    linkColorRGB?: number;
    linkHoverColorRGB?: number;
    linkActiveColorRGB?: number;
    usePixelPerfectNineSlice?: boolean;
    emblemXY?: ClientModuleChatPoint;
    emblemMultilineXY?: ClientModuleChatPoint;
}

/** `multiply`: Habbo's. `subtract`: each channel the colour less the layer's darkness, `colour - (255 - layer)`. */
export type ClientModuleChatBubbleTint = 'multiply' | 'subtract';

export interface ClientModuleChatBubbleStyle {
    /** The asset id of another style in the `habbo-free-flow-chat-com` bundle: its bitmaps and reg points draw this one. */
    art?: string;
    /** Over the style's (or its `art`'s) reg points, key by key. */
    regPoints?: Partial<ClientModuleChatRegPoints>;
    /** How `chat_bubble_color` takes the speaker's colour. */
    tint?: ClientModuleChatBubbleTint;
}

export interface ClientModuleChatBubbleRun {
    bold?: boolean;
    italic?: boolean;
    /** `#rrggbb`. */
    color?: string;
}

export interface ClientModuleChatBubbleLine {
    /** The `name: ` prefix (Habbo: bold, italic on a whisper). */
    name?: ClientModuleChatBubbleRun;
    /** The message (Habbo: bold on a shout, italic on a whisper). */
    text?: ClientModuleChatBubbleRun;
    /** The text's alpha (Habbo: 0.6 on a whisper, 1 else). */
    alpha?: number;
}

/** `chat.bubbles`. */
export interface ClientModuleChatBubbles {
    /** By chat style id (`"0"`), or `"*"` for every style under its own entry. */
    styles?: Record<string, ClientModuleChatBubbleStyle>;
    /** `whisper` is every line Habbo draws italic: whispers, respects, hand items. */
    lines?: Partial<Record<'talk' | 'shout' | 'whisper', ClientModuleChatBubbleLine>>;
}
