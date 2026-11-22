/**
 * Not Flash's: `loading.screen`, the hotel's look for the loading screen. The screen is up before any
 * client module loads, so a theme cannot draw it; it reads this from the configuration the client
 * boots with instead (Turbo merges each plugin's entries into it, as `templates.patches`). The object,
 * or the object as JSON text; each value it leaves out is Habbo's own:
 *
 * | Key | What |
 * | --- | --- |
 * | `background` | The screen's colour, `#rrggbb` |
 * | `backgroundImage` | A picture behind everything (a hotel view shot): covering the screen, centred, unless... |
 * | `backgroundSize` | `cover` (the default), `contain`, `auto` (its own size) or a scale (`0.5`) |
 * | `backgroundPosition` | Where it sits, as CSS says it: `left` / `center` / `right` and `top` / `center` / `bottom` (`"left bottom"`) |
 * | `backgroundOffset` | `[ x, y ]` pixels from there |
 * | `backgroundRepeat` | `no-repeat` (the default), `repeat-x`, `repeat-y` or `repeat`: tiled from where it sits |
 * | `layers` | More pictures over it, in order, each `{ image, size, position, offset, repeat }` as the `background*` keys (a hotel view's sky, its left and right parts) |
 * | `backgroundSaturation` | The pictures' saturation, 0-1, as CSS `saturate()` (`0.1`: nearly grey) |
 * | `photo` | `false` leaves out Habbo's photo frame |
 * | `box` | `{ width, height, color, alpha, radius }`: a panel behind the logo, text and bar, centred |
 * | `logo` | A picture over the text, centred |
 * | `text` | The line over the bar in place of the revolving `client.starting.revolving` lines: a text key, or the text itself |
 * | `textColor`, `textSize` | The line's colour and size |
 * | `textWidth` | The width the line wraps at (centred); one line without |
 * | `bar` | `{ outline, well, fill, fillBottom, width }`: the bar's colours, and its width (Habbo's is 400) |
 * | `percentColor` | The percentage's colour; `percent: false` leaves it out |
 * | `order` | The parts top to bottom, of `logo`, `text`, `bar`, `percent` (`[ "logo", "bar", "text" ]`); one left out follows in Habbo's order |
 *
 * A value of the wrong type is ignored, so a typo shows Habbo's screen rather than a broken one.
 * Kept free of runtime imports, so a test can run it under Node.
 */

export const LOADING_SCREEN_KEY = 'loading.screen';

/** A part of the stack the screen centres: the hotel's logo, the line, the bar, the percentage. */
export type LoadingScreenPart = 'logo' | 'text' | 'bar' | 'percent';

/** Habbo's order (`positionLoadingScreenDisplayElements`). */
export const LOADING_SCREEN_PARTS: readonly LoadingScreenPart[] = [ 'logo', 'text', 'bar', 'percent' ];

export type LoadingScreenLayerSize = 'cover' | 'contain' | 'auto' | number;

export type LoadingScreenLayerRepeat = 'no-repeat' | 'repeat-x' | 'repeat-y' | 'repeat';

/** `backgroundImage` and each of `layers`, as the config writes them. */
export interface LoadingScreenLayerInput {
    image: string;
    size?: LoadingScreenLayerSize;
    position?: string;
    offset?: readonly [ number, number ];
    repeat?: LoadingScreenLayerRepeat;
}

/** A picture of the background, read. */
export interface LoadingScreenLayer {
    image: string;
    size: LoadingScreenLayerSize;
    alignX: 'left' | 'center' | 'right';
    alignY: 'top' | 'center' | 'bottom';
    offsetX: number;
    offsetY: number;
    repeat: LoadingScreenLayerRepeat;
}

export interface LoadingScreenBox {
    width: number;
    height: number;
    color: string;
    alpha: number;
    radius: number;
}

export interface LoadingScreenBar {
    width?: number;
    outline?: string;
    well?: string;
    fill?: string;
    fillBottom?: string;
}

/** The configuration value as a hotel writes it (`loading.screen`); every key may be left out. */
export interface LoadingScreenInput {
    background?: string;
    backgroundImage?: string;
    backgroundSize?: LoadingScreenLayerSize;
    backgroundPosition?: string;
    backgroundOffset?: readonly [ number, number ];
    backgroundRepeat?: LoadingScreenLayerRepeat;
    layers?: readonly LoadingScreenLayerInput[];
    backgroundSaturation?: number;
    photo?: boolean;
    box?: { width: number; height: number; color?: string; alpha?: number; radius?: number };
    logo?: string;
    text?: string;
    textColor?: string;
    textSize?: number;
    textWidth?: number;
    bar?: LoadingScreenBar;
    percent?: boolean;
    percentColor?: string;
    order?: readonly LoadingScreenPart[];
}

export interface LoadingScreenStyle {
    background?: string;
    /** `backgroundImage` first, then `layers`, bottom to top. */
    layers: LoadingScreenLayer[];
    backgroundSaturation?: number;
    photo: boolean;
    box?: LoadingScreenBox;
    logo?: string;
    text?: string;
    textColor?: string;
    textSize?: number;
    textWidth?: number;
    bar: LoadingScreenBar;
    percent: boolean;
    percentColor?: string;
    order: readonly LoadingScreenPart[];
}

const COLOR = /^#([0-9a-f]{6})$/i;

const color = (value: unknown) => ((typeof value === 'string') && COLOR.test(value.trim()) ? value.trim().toLowerCase() : undefined);

const text = (value: unknown) => ((typeof value === 'string') && value.trim().length ? value.trim() : undefined);

const positive = (value: unknown) => ((typeof value === 'number') && Number.isFinite(value) && (value > 0) ? value : undefined);

const unit = (value: unknown) => ((typeof value === 'number') && Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : undefined);

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

const SIZES = [ 'cover', 'contain', 'auto' ];
const REPEATS = [ 'no-repeat', 'repeat-x', 'repeat-y', 'repeat' ];

const size = (value: unknown): LoadingScreenLayerSize => (((typeof value === 'string') && SIZES.includes(value)) ? value as LoadingScreenLayerSize : (positive(value) ?? 'cover'));

const repeat = (value: unknown): LoadingScreenLayerRepeat => (((typeof value === 'string') && REPEATS.includes(value)) ? value as LoadingScreenLayerRepeat : 'no-repeat');

const finite = (value: unknown) => (((typeof value === 'number') && Number.isFinite(value)) ? value : 0);

/** CSS `background-position` keywords: one names its axis (or `center` either), the axis it leaves out is centred. */
const position = (value: unknown): Pick<LoadingScreenLayer, 'alignX' | 'alignY'> => {
    let alignX: LoadingScreenLayer['alignX'] | undefined;
    let alignY: LoadingScreenLayer['alignY'] | undefined;

    for (const word of ((typeof value === 'string') ? value.trim().toLowerCase().split(/\s+/) : [])) {
        if (word === 'left' || word === 'right') alignX = word;
        else if (word === 'top' || word === 'bottom') alignY = word;
        else if (word === 'center') {
            if (alignX === undefined) alignX = 'center';
            else alignY ??= 'center';
        }
    }

    return { alignX: alignX ?? 'center', alignY: alignY ?? 'center' };
};

const layer = (image: unknown, values: Record<string, unknown>, prefix: string): LoadingScreenLayer | undefined => {
    const url = text(image);
    const key = (name: string) => (prefix ? `${prefix}${name[0].toUpperCase()}${name.slice(1)}` : name);
    const offset = values[key('offset')];

    if (!url) return undefined;

    return {
        image: url,
        size: size(values[key('size')]),
        ...position(values[key('position')]),
        offsetX: Array.isArray(offset) ? finite(offset[0]) : 0,
        offsetY: Array.isArray(offset) ? finite(offset[1]) : 0,
        repeat: repeat(values[key('repeat')]),
    };
};

/** The listed parts in their order, each once, then those it leaves out in Habbo's. */
const order = (value: unknown): readonly LoadingScreenPart[] => {
    if (!Array.isArray(value)) return LOADING_SCREEN_PARTS;

    const listed = LOADING_SCREEN_PARTS.filter(part => value.includes(part)).sort((a, b) => value.indexOf(a) - value.indexOf(b));

    return listed.length ? [ ...listed, ...LOADING_SCREEN_PARTS.filter(part => !listed.includes(part)) ] : LOADING_SCREEN_PARTS;
};

/** The configuration value as a style; Habbo's own screen for none. */
export const parseLoadingScreenStyle = (value: unknown): LoadingScreenStyle => {
    const style = record(value) ?? {};
    const box = record(style.box);
    const bar = record(style.bar) ?? {};
    const boxWidth = positive(box?.width);
    const boxHeight = positive(box?.height);
    const extra = Array.isArray(style.layers) ? style.layers : [];
    const layers = [ layer(style.backgroundImage, style, 'background'), ...extra.map((entry: unknown) => {
        const values = record(entry);

        return values ? layer(values.image, values, '') : undefined;
    }) ];

    return {
        background: color(style.background),
        layers: layers.filter(entry => entry !== undefined),
        backgroundSaturation: unit(style.backgroundSaturation),
        photo: style.photo !== false,
        box: (box && boxWidth && boxHeight) ? { width: boxWidth, height: boxHeight, color: color(box.color) ?? '#000000', alpha: unit(box.alpha) ?? 1, radius: positive(box.radius) ?? 0 } : undefined,
        logo: text(style.logo),
        text: text(style.text),
        textColor: color(style.textColor),
        textSize: positive(style.textSize),
        textWidth: positive(style.textWidth),
        bar: { width: positive(bar.width), outline: color(bar.outline), well: color(bar.well), fill: color(bar.fill), fillBottom: color(bar.fillBottom) },
        percent: style.percent !== false,
        percentColor: color(style.percentColor),
        order: order(style.order),
    };
};

/** Where a layer is drawn on a `width` x `height` screen: its sprite's rect, scale, and for a tiled one the tiles' offset in it. */
export interface LoadingScreenLayerPlacement {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    tiled: boolean;
    tileX: number;
    tileY: number;
}

/** CSS `background-size` / `-position` / `-repeat` for one picture of `imageWidth` x `imageHeight`. */
export const placeLoadingScreenLayer = (entry: LoadingScreenLayer, imageWidth: number, imageHeight: number, width: number, height: number): LoadingScreenLayerPlacement => {
    const scale = (entry.size === 'cover')
        ? Math.max(width / imageWidth, height / imageHeight)
        : (entry.size === 'contain') ? Math.min(width / imageWidth, height / imageHeight) : (entry.size === 'auto') ? 1 : entry.size;
    const drawnWidth = imageWidth * scale;
    const drawnHeight = imageHeight * scale;
    const along = (align: string, room: number, drawn: number) => ((align === 'left' || align === 'top') ? 0 : (align === 'center') ? (room - drawn) / 2 : room - drawn);
    const x = Math.round(along(entry.alignX, width, drawnWidth) + entry.offsetX);
    const y = Math.round(along(entry.alignY, height, drawnHeight) + entry.offsetY);
    const acrossX = (entry.repeat === 'repeat-x') || (entry.repeat === 'repeat');
    const acrossY = (entry.repeat === 'repeat-y') || (entry.repeat === 'repeat');
    // A tiled axis spans the screen, its tiles shifted so one still starts where the picture sits.
    const tile = (at: number, drawn: number) => ((drawn > 0) ? (((at % drawn) + drawn) % drawn) : 0);

    return {
        x: acrossX ? 0 : x,
        y: acrossY ? 0 : y,
        width: acrossX ? width : drawnWidth,
        height: acrossY ? height : drawnHeight,
        scale,
        tiled: acrossX || acrossY,
        tileX: acrossX ? tile(x, drawnWidth) : 0,
        tileY: acrossY ? tile(y, drawnHeight) : 0,
    };
};

/** CSS `saturate(amount)` as a Pixi colour matrix (4x5, offsets 0-1). */
export const saturationMatrix = (amount: number): number[] => {
    const s = amount;

    return [
        0.213 + (0.787 * s), 0.715 - (0.715 * s), 0.072 - (0.072 * s), 0, 0,
        0.213 - (0.213 * s), 0.715 + (0.285 * s), 0.072 - (0.072 * s), 0, 0,
        0.213 - (0.213 * s), 0.715 - (0.715 * s), 0.072 + (0.928 * s), 0, 0,
        0, 0, 0, 1, 0,
    ];
};
