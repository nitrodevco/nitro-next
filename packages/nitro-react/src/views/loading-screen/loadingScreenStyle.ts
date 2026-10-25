/**
 * Not Flash's: `loading.screen`, the hotel's look for the loading screen. The screen is up before any
 * client module loads, so a theme cannot draw it; it reads this from the configuration the client
 * boots with instead (Turbo merges each plugin's entries into it, as `templates.patches`). The object,
 * or the object as JSON text; each value it leaves out is Habbo's own:
 *
 * | Key | What |
 * | --- | --- |
 * | `background` | The screen's colour, `#rrggbb` |
 * | `backgroundImage` | A picture covering the screen, centred (a hotel view shot) |
 * | `backgroundSaturation` | The picture's saturation, 0-1, as CSS `saturate()` (`0.1`: nearly grey) |
 * | `photo` | `false` leaves out Habbo's photo frame |
 * | `box` | `{ width, height, color, alpha, radius }`: a panel behind the logo, text and bar, centred |
 * | `logo` | A picture over the text, centred |
 * | `text` | The line over the bar in place of the revolving `client.starting.revolving` lines: a text key, or the text itself |
 * | `textColor`, `textSize` | The line's colour and size |
 * | `bar` | `{ outline, well, fill, fillBottom, width }`: the bar's colours, and its width (Habbo's is 400) |
 * | `percentColor` | The percentage's colour; `percent: false` leaves it out |
 *
 * A value of the wrong type is ignored, so a typo shows Habbo's screen rather than a broken one.
 * Kept free of runtime imports, so a test can run it under Node.
 */

export const LOADING_SCREEN_KEY = 'loading.screen';

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

export interface LoadingScreenStyle {
    background?: string;
    backgroundImage?: string;
    backgroundSaturation?: number;
    photo: boolean;
    box?: LoadingScreenBox;
    logo?: string;
    text?: string;
    textColor?: string;
    textSize?: number;
    bar: LoadingScreenBar;
    percent: boolean;
    percentColor?: string;
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

/** The configuration value as a style; Habbo's own screen for none. */
export const parseLoadingScreenStyle = (value: unknown): LoadingScreenStyle => {
    const style = record(value) ?? {};
    const box = record(style.box);
    const bar = record(style.bar) ?? {};
    const boxWidth = positive(box?.width);
    const boxHeight = positive(box?.height);

    return {
        background: color(style.background),
        backgroundImage: text(style.backgroundImage),
        backgroundSaturation: unit(style.backgroundSaturation),
        photo: style.photo !== false,
        box: (box && boxWidth && boxHeight) ? { width: boxWidth, height: boxHeight, color: color(box.color) ?? '#000000', alpha: unit(box.alpha) ?? 1, radius: positive(box.radius) ?? 0 } : undefined,
        logo: text(style.logo),
        text: text(style.text),
        textColor: color(style.textColor),
        textSize: positive(style.textSize),
        bar: { width: positive(bar.width), outline: color(bar.outline), well: color(bar.well), fill: color(bar.fill), fillBottom: color(bar.fillBottom) },
        percent: style.percent !== false,
        percentColor: color(style.percentColor),
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
