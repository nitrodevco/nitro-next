/**
 * Not Flash's: `chat.bubbles`, a theme's look for the room's chat bubbles, read from the
 * configuration the client boots with (Turbo merges each plugin's entries into it, as
 * `loading.screen`). The object, or the object as JSON text; everything it leaves out is Habbo's own,
 * and with none set every bubble is drawn as Flash drew it, on the same path:
 *
 * | Key | What |
 * | --- | --- |
 * | `styles` | By chat style id (`"0"`, `"40"`), or `"*"` for every style under its own entry: `art`, `regPoints`, `tint` |
 * | `styles.<id>.art` | The asset id of another style in the `habbo-free-flow-chat-com` bundle: its bitmaps and reg points draw this style |
 * | `styles.<id>.regPoints` | Reg points over the style's (or its `art`'s), key by key (`ChatStyleRegPoints`): the bubble's spacing is its height less `overlapRect`'s top and bottom |
 * | `styles.<id>.tint` | How `chat_bubble_color` takes the speaker's colour: `multiply` (Flash's `ColorTransform`) or `subtract` (each channel the colour less the layer's darkness, `colour - (255 - layer)`) |
 * | `lines` | By line: `talk`, `shout`, `whisper` (every line Flash draws italic: whispers, respects, hand items...) |
 * | `lines.<line>.name` / `.text` | `{ bold, italic, color }` of the `name: ` prefix / the message (Flash: the name bold, shouts bold, whispers italic, the style's colour) |
 * | `lines.<line>.alpha` | The text's alpha (Flash: 0.6 for the italic lines, 1 else) |
 *
 * A value of the wrong type is ignored. Kept free of runtime imports, so a test can run it under Node.
 */
import type { ChatStyleRegPoints } from '@nitrodevco/nitro-theme/chat';

export const CHAT_BUBBLES_KEY = 'chat.bubbles';

/** The `styles` entry every style takes before its own. */
export const CHAT_BUBBLE_ALL_STYLES = '*';

export type ChatBubbleTint = 'multiply' | 'subtract';

export interface ChatBubbleStyleTheme {
    art?: string;
    regPoints?: Partial<ChatStyleRegPoints>;
    tint?: ChatBubbleTint;
}

export interface ChatBubbleRunStyle {
    bold?: boolean;
    italic?: boolean;
    /** `#rrggbb`. */
    color?: string;
}

export interface ChatBubbleLineTheme {
    name?: ChatBubbleRunStyle;
    text?: ChatBubbleRunStyle;
    alpha?: number;
}

export type ChatBubbleLine = 'talk' | 'shout' | 'whisper';

/** The `chat.bubbles` value, as a theme writes it. */
export interface ChatBubbleTheme {
    styles?: Record<string, ChatBubbleStyleTheme>;
    lines?: Partial<Record<ChatBubbleLine, ChatBubbleLineTheme>>;
}

const LINES: readonly ChatBubbleLine[] = [ 'talk', 'shout', 'whisper' ];

const COLOR = /^#[0-9a-f]{6}$/i;

const record = (value: unknown): Record<string, unknown> | undefined => {
    let parsed = value;

    if (typeof parsed === 'string') {
        try {
            parsed = JSON.parse(parsed) as unknown;
        } catch {
            return undefined;
        }
    }

    return (parsed && (typeof parsed === 'object') && !Array.isArray(parsed)) ? parsed as Record<string, unknown> : undefined;
};

const isNumber = (value: unknown): value is number => (typeof value === 'number') && Number.isFinite(value);

const isRect = (value: unknown) => {
    const rect = record(value);

    return !!rect && [ 'x', 'y', 'width', 'height' ].every(key => isNumber(rect[key]));
};

const isPoint = (value: unknown) => {
    const point = record(value);

    return !!point && isNumber(point.x) && isNumber(point.y);
};

/** Each reg point by the kind of value it takes, as `ChatStyleLibrary` reads them. */
const REG_POINT_KINDS: Record<keyof ChatStyleRegPoints, (value: unknown) => boolean> = {
    scale9: isRect,
    pointerY: isNumber,
    pointerXMargins: value => Array.isArray(value) && value.every(isNumber),
    faceXY: isPoint,
    colorXY: isPoint,
    anonymous: value => typeof value === 'boolean',
    textFieldMargins: isRect,
    textColorRGB: isNumber,
    fontFace: value => (typeof value === 'string') && (value.length > 0),
    fontSize: value => isNumber(value) && (value > 0),
    overlapRect: isRect,
    linkColorRGB: isNumber,
    linkHoverColorRGB: isNumber,
    linkActiveColorRGB: isNumber,
    usePixelPerfectNineSlice: value => typeof value === 'boolean',
    emblemXY: isPoint,
    emblemMultilineXY: isPoint,
};

const readRegPoints = (value: unknown): Partial<ChatStyleRegPoints> | undefined => {
    const points = record(value);

    if (!points) return undefined;

    const read = Object.fromEntries(Object.entries(points).filter(([ key, point ]) => (key in REG_POINT_KINDS) && REG_POINT_KINDS[key as keyof ChatStyleRegPoints](point)));

    return Object.keys(read).length ? read : undefined;
};

const readStyle = (value: unknown): ChatBubbleStyleTheme | undefined => {
    const style = record(value);

    if (!style) return undefined;

    const read: ChatBubbleStyleTheme = {};

    if ((typeof style.art === 'string') && style.art.length) read.art = style.art;

    const regPoints = readRegPoints(style.regPoints);

    if (regPoints) read.regPoints = regPoints;
    if ((style.tint === 'multiply') || (style.tint === 'subtract')) read.tint = style.tint;

    return Object.keys(read).length ? read : undefined;
};

const readRun = (value: unknown): ChatBubbleRunStyle | undefined => {
    const run = record(value);

    if (!run) return undefined;

    const read: ChatBubbleRunStyle = {};

    if (typeof run.bold === 'boolean') read.bold = run.bold;
    if (typeof run.italic === 'boolean') read.italic = run.italic;
    if ((typeof run.color === 'string') && COLOR.test(run.color)) read.color = run.color.toLowerCase();

    return Object.keys(read).length ? read : undefined;
};

const readLine = (value: unknown): ChatBubbleLineTheme | undefined => {
    const line = record(value);

    if (!line) return undefined;

    const read: ChatBubbleLineTheme = {};
    const name = readRun(line.name);
    const text = readRun(line.text);

    if (name) read.name = name;
    if (text) read.text = text;
    if (isNumber(line.alpha)) read.alpha = Math.min(1, Math.max(0, line.alpha));

    return Object.keys(read).length ? read : undefined;
};

/** The configuration value as a theme, keeping only what it reads; `undefined` when it sets nothing (Habbo's bubbles). */
export const parseChatBubbleTheme = (value: unknown): ChatBubbleTheme | undefined => {
    const theme = record(value);

    if (!theme) return undefined;

    const parsed: ChatBubbleTheme = {};
    const styles = Object.entries(record(theme.styles) ?? {})
        .filter(([ id ]) => (id === CHAT_BUBBLE_ALL_STYLES) || /^\d+$/.test(id))
        .map(([ id, style ]) => [ id, readStyle(style) ] as const)
        .filter((entry): entry is readonly [ string, ChatBubbleStyleTheme ] => !!entry[1]);
    const lines = record(theme.lines) ?? {};
    const readLines = LINES.map(line => [ line, readLine(lines[line]) ] as const).filter((entry): entry is readonly [ ChatBubbleLine, ChatBubbleLineTheme ] => !!entry[1]);

    if (styles.length) parsed.styles = Object.fromEntries(styles);
    if (readLines.length) parsed.lines = Object.fromEntries(readLines);

    return Object.keys(parsed).length ? parsed : undefined;
};

/** What a style is drawn with: `"*"`'s entry, then its own over it (reg points merged key by key). */
export const chatBubbleStyleTheme = (theme: ChatBubbleTheme | undefined, styleId: number): ChatBubbleStyleTheme | undefined => {
    const all = theme?.styles?.[CHAT_BUBBLE_ALL_STYLES];
    const own = theme?.styles?.[String(styleId)];

    if (!all || !own) return own ?? all;

    const regPoints = (all.regPoints || own.regPoints) ? { ...all.regPoints, ...own.regPoints } : undefined;

    return { ...all, ...own, ...(regPoints && { regPoints }) };
};

/**
 * The `subtract` tint over a colour layer's RGBA pixels, in place: each channel the colour less
 * the layer's darkness (`colour - (255 - layer)`, never under 0), alpha kept. A white layer pixel
 * takes the colour, a black one stays black - a strip drawn in greys comes out darker than
 * `multiply` makes it.
 */
export const subtractChatBubbleTint = (pixels: Uint8ClampedArray, color: number): void => {
    const rgb = [ (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff ];

    for (let i = 0; i < pixels.length; i += 4) {
        if (!pixels[i + 3]) continue;

        pixels[i] = rgb[0] - (255 - pixels[i]);
        pixels[i + 1] = rgb[1] - (255 - pixels[i + 1]);
        pixels[i + 2] = rgb[2] - (255 - pixels[i + 2]);
    }
};

const run = (text: string, style: { bold: boolean; italic: boolean; color?: string }): string => {
    let markup = text;

    if (style.bold) markup = `<b>${markup}</b>`;
    if (style.italic) markup = `<i>${markup}</i>`;
    if (style.color) markup = `<font color="${style.color}">${markup}</font>`;

    return markup;
};

/**
 * A line's name and message as a theme's `lines` entry styles them, each run on its own: Flash's
 * weights and slants (`bold` name, `bold` shout, `italic` whisper) where the entry leaves one out.
 */
export const themedChatBubbleLine = (name: string | undefined, text: string, line: ChatBubbleLine, theme: ChatBubbleLineTheme): { markup: string; alpha: number } => {
    const italic = (line === 'whisper');
    const namePart = (name !== undefined) ? run(`${name}: `, { bold: theme.name?.bold ?? true, italic: theme.name?.italic ?? italic, color: theme.name?.color }) : '';
    const textPart = run(text, { bold: theme.text?.bold ?? (line === 'shout'), italic: theme.text?.italic ?? italic, color: theme.text?.color });

    return { markup: namePart + textPart, alpha: theme.alpha ?? (italic ? 0.6 : 1) };
};

let current: ChatBubbleTheme | undefined;

/** The theme the chat style library read at boot (`setChatBubbleTheme`); `undefined` for Habbo's bubbles. */
export const chatBubbleTheme = (): ChatBubbleTheme | undefined => current;

export const setChatBubbleTheme = (theme: ChatBubbleTheme | undefined): void => {
    current = theme;
};
