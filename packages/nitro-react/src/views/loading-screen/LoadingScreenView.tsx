/**
 * The loading screen - `HabboLoadingScreen` (`splash/UnknownSprite_2e9dcc` in the JS client), laid
 * out by `positionLoadingScreenDisplayElements` over the whole desktop:
 *
 * - the `0x0e151c` background;
 * - `PhotoSplashScreen`: `splash_bg`, one of thirty user photos at (96, 51) and `splash_top` over
 *   it, 500x434, centred;
 * - a line from `client.starting.revolving` (`/`-separated) in Ubuntu bold 28, white, 50 below it;
 * - the 400x25 bar 10 under that - a white outline with its corners left open, and a black well
 *   the fill runs along, `0xbacad3` over `0x8ca1ad`;
 * - the percentage in Ubuntu bold 14, `0x999999`, 5 under the bar.
 *
 * The whole block is centred vertically, 20 above the middle. The bar does not measure anything: a
 * 750 ms timer (`onBarProgressEvent`) fills it by 35-55 points a tick, empties it once full and on
 * that turn moves to the next line of the revolving text (`(index + 1) % (lines - 1)`, which never
 * comes back to the last line - Flash's own arithmetic). What loading has really done is the
 * percentage, `progress`, which the caller works out the way `HabboAir.updateProgressBar` does.
 *
 * With `error` set the timer stops, the line becomes `${client.loading.failed}` ("Loading failed"
 * when that is not a text), the percentage empties and the message shows under it in Ubuntu 16,
 * `0x7ecaee`, wrapping at `max(320, min(width - 80, 760))` (`showError`).
 *
 * The photo and the first line are picked at random when the screen is built; the caller passes
 * those picks (`photo`, `seed`) so rendering stays pure. The version text in the top right corner
 * is the AIR application's version, which the JS client leaves out when it has none - as the port
 * does.
 *
 * Flash lays the block out again on every resize from where the photo already is, so it creeps
 * towards a different resting place; here the first layout's formula is used at every size.
 *
 * Not Flash's: a hotel restyles it with `loading.screen` (`loadingScreenStyle.ts`) - its colours, a
 * picture behind it, a logo and a panel in place of the photo frame - as no client module has loaded
 * yet to draw one.
 */
import { ColorMatrix, ColorMatrixFilter, Graphics } from 'pixi.js';
import { useEffect, useMemo, useState } from 'react';

import { useTranslation } from '#base/context/system';
import { useViewportSize } from '#base/hooks';
import { Box, Region, ThemeImage, ThemeText, useTextureFromUrl } from '#base/theme';

import { LoadingScreenStyle, saturationMatrix } from './loadingScreenStyle';

/** `HabboLoadingScreen`'s background. */
const BACKGROUND = '#0e151c';

/** `PhotoSplashScreen`: the frame's size, and where the photo sits in it. */
const SPLASH_WIDTH = 500;
const SPLASH_HEIGHT = 434;
const PHOTO_X = 96;
const PHOTO_Y = 51;

/** `LOADING_BAR_WIDTH` / `_HEIGHT` / `_BORDER_WIDTH` / `_BORDER_SPACING`. */
const BAR_WIDTH = 400;
const BAR_HEIGHT = 25;
const BAR_BORDER_WIDTH = 2;
const BAR_BORDER_SPACING = 2;
/** The outline's stroke reaches half a pixel past the rectangle on every side. */
const BAR_BOX_HEIGHT = BAR_HEIGHT + 1;
const BAR_FILL_TOP = '#bacad3';
const BAR_FILL_BOTTOM = '#8ca1ad';

/** `positionLoadingScreenDisplayElements`' spacing unit. */
const SPACING = 10;
/** The text's distance below the photo. */
const TEXT_GAP = 50;

/** `onBarProgressEvent`'s timer. */
const BAR_TICK_MS = 750;

/** `showError`'s message field. */
const ERROR_COLOR = '#7ecaee';
const ERROR_MIN_WIDTH = 320;
const ERROR_MAX_WIDTH = 760;
const ERROR_MARGIN = 80;

const TEXT_COLOR = '#ffffff';
const NUMBER_COLOR = '#999999';

/** `randomNumber(min, max)`: an integer in `[min, max]`. */
const randomNumber = (min: number, max: number) => Math.floor(Math.random() * ((max - min) + 1)) + min;

interface BarState {
    /** The fake fill, 0-100. */
    fill: number;
    /** The revolving text moves on at the next tick. */
    pending: boolean;
    /** `§_-q1J§`: the line the text moves to next; `undefined` until the timer has moved it. */
    index?: number;
    /** The line on screen; `undefined` until the first move, while the random pick shows. */
    shown?: number;
}

/**
 * `onBarProgressEvent` (the JS client's arithmetic): the fill empties the tick after it reached
 * 100, putting up the line `index` moved to when it did.
 */
const stepBar = (state: BarState, lines: number, firstLine: number): BarState => {
    let { fill, pending, index, shown } = state;

    if (fill === 100) {
        if (pending) shown = index;

        pending = false;
        fill = 0;
    } else {
        fill += Math.min(randomNumber(35, Math.min(randomNumber(45, 55), 100 - fill)), 100 - fill);
    }

    if ((fill === 100) && (lines > 1)) {
        pending = true;
        index = ((index ?? firstLine) + 1) % (lines - 1);
    }

    return { fill, pending, index, shown };
};

export interface LoadingScreenViewProps {
    /** `updateLoadingBar`: 0-1. */
    progress: number;
    /** `showError`'s message, when loading failed. */
    error?: string;
    /** `PhotoSplashScreen`'s pick, 1-30. */
    photo: number;
    /** A random number in [0, 1) the first line of the revolving text is picked with. */
    seed: number;
    /** The hotel's `loading.screen`; Habbo's own look without. */
    look?: LoadingScreenStyle;
}

/** `backgroundImage`: covering the screen, centred, at its `backgroundSaturation`. */
const LoadingBackgroundImage = ({ url, saturation, width, height }: { url: string; saturation?: number; width: number; height: number }) => {
    const texture = useTextureFromUrl(url);
    const filters = useMemo(() => {
        if ((saturation === undefined) || (saturation >= 1)) return undefined;

        const filter = new ColorMatrixFilter();

        filter.matrix = saturationMatrix(saturation) as ColorMatrix;

        return [ filter ];
    }, [ saturation ]);

    useEffect(() => () => filters?.forEach(filter => filter.destroy()), [ filters ]);

    if (!texture) return null;

    const scale = Math.max(width / texture.width, height / texture.height);

    return (
        <pixiSprite
            texture={texture}
            filters={filters}
            scale={scale}
            x={Math.round((width - (texture.width * scale)) / 2)}
            y={Math.round((height - (texture.height * scale)) / 2)}
            eventMode="none"
        />
    );
};

export const LoadingScreenView = ({ progress, error, photo, seed, look }: LoadingScreenViewProps) => {
    const { width, height } = useViewportSize();
    const t = useTranslation();
    const revolving = t('client.starting.revolving', '');
    const lines = revolving ? revolving.split('/') : [];
    const firstLine = Math.floor(seed * lines.length);
    const [ bar, setBar ] = useState<BarState>({ fill: 0, pending: false });

    useEffect(() => {
        if (error !== undefined) return;

        const timer = setInterval(() => setBar(state => stepBar(state, lines.length, firstLine)), BAR_TICK_MS);

        return () => clearInterval(timer);
    }, [ error, lines.length, firstLine ]);

    const caption = (error !== undefined)
        ? t('client.loading.failed', 'Loading failed')
        : (look?.text ? t(look.text, look.text) : (lines.length ? (lines[bar.shown ?? firstLine] ?? '') : t('client.starting', '')));

    const top = Math.trunc(((height - (SPLASH_HEIGHT + BAR_BOX_HEIGHT)) / 2) - (SPACING * 2));
    const captionTop = top + SPLASH_HEIGHT + TEXT_GAP;
    const fillHeight = BAR_HEIGHT - (BAR_BORDER_WIDTH * 2) - (BAR_BORDER_SPACING * 2);
    // `bar.width`: a hotel's panel narrower than Habbo's 400.
    const barWidth = look?.bar.width ?? BAR_WIDTH;
    const fillWidth = (barWidth - (BAR_BORDER_WIDTH * 2) - (BAR_BORDER_SPACING * 2)) * (bar.fill / 100);
    const inset = BAR_BORDER_WIDTH + BAR_BORDER_SPACING;
    const errorWidth = Math.max(ERROR_MIN_WIDTH, Math.min(width - ERROR_MARGIN, ERROR_MAX_WIDTH));
    const outline = look?.bar.outline ?? TEXT_COLOR;
    const framed = look?.photo !== false;
    const box = look?.box;

    // The logo (a hotel's), the text, the bar, the percentage and the error, each centred, stacked 10, 5 and 10 apart.
    const stack = (
        <>
            {look?.logo && (
                <ThemeImage
                    src={look.logo}
                    bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                    layout={{ marginBottom: SPACING, flexShrink: 0 }}
                />
            )}
            <ThemeText
                name="textField"
                text={caption}
                textStyle="u_headline_small"
                textOptions={{ fontSize: look?.textSize ?? 28, fill: look?.textColor ?? TEXT_COLOR, align: 'center' }}
                flashFormat={{ kerning: false }}
                verticalAlign="top"
            />
            <Region
                name="fileLoadingBar"
                layout={{ marginTop: SPACING, width: barWidth + 1, height: BAR_BOX_HEIGHT, flexShrink: 0 }}
            >
                <Region
                    backgroundColor={outline}
                    layout={{ position: 'absolute', left: 1, top: 0, width: barWidth - 1, height: 1 }}
                />
                <Region
                    backgroundColor={outline}
                    layout={{ position: 'absolute', left: barWidth, top: 1, width: 1, height: BAR_HEIGHT - 1 }}
                />
                <Region
                    backgroundColor={outline}
                    layout={{ position: 'absolute', left: 1, top: BAR_HEIGHT, width: barWidth - 1, height: 1 }}
                />
                <Region
                    backgroundColor={outline}
                    layout={{ position: 'absolute', left: 0, top: 1, width: 1, height: BAR_HEIGHT - 1 }}
                />
                <Region
                    name="fileBarSprite"
                    backgroundColor={look?.bar.well ?? '#000000'}
                    layout={{ position: 'absolute', left: inset - 1, top: inset - 1, width: barWidth - (BAR_BORDER_WIDTH * 2), height: BAR_HEIGHT - (BAR_BORDER_SPACING * 2) }}
                />
                {(fillWidth > 0) && (
                    <>
                        <Region
                            backgroundColor={look?.bar.fill ?? BAR_FILL_TOP}
                            layout={{ position: 'absolute', left: inset, top: inset, width: fillWidth, height: fillHeight / 2 }}
                        />
                        <Region
                            backgroundColor={look?.bar.fillBottom ?? look?.bar.fill ?? BAR_FILL_BOTTOM}
                            layout={{ position: 'absolute', left: inset, top: inset + (fillHeight / 2), width: fillWidth, height: (fillHeight / 2) + 1 }}
                        />
                    </>
                )}
            </Region>
            {(look?.percent !== false) && (
                <Box layout={{ marginTop: SPACING / 2, flexShrink: 0 }}>
                    <ThemeText
                        name="loadingNumberTextField"
                        text={(error !== undefined) ? '' : `${Math.round(progress * 100)}%`}
                        textStyle="u_headline_small"
                        textOptions={{ fontSize: 14, fill: look?.percentColor ?? NUMBER_COLOR, align: 'center' }}
                        flashFormat={{ kerning: false }}
                        verticalAlign="top"
                    />
                </Box>
            )}
            {(error !== undefined) && (
                <Box layout={{ marginTop: SPACING, width: errorWidth, flexShrink: 0 }}>
                    <ThemeText
                        name="errorTextField"
                        text={error}
                        textStyle="u_regular"
                        textOptions={{ fontSize: 16, fill: ERROR_COLOR, align: 'center', wordWrap: true, wordWrapWidth: errorWidth - 4 }}
                        flashFormat={{ kerning: false, sharpness: 0, thickness: 0 }}
                        verticalAlign="top"
                        layout={{ width: errorWidth }}
                    />
                </Box>
            )}
        </>
    );

    return (
        <Region
            name="background"
            backgroundColor={look?.background ?? BACKGROUND}
            layout={{ position: 'absolute', left: 0, top: 0, width, height }}
        >
            {look?.backgroundImage && (
                <LoadingBackgroundImage
                    url={look.backgroundImage}
                    saturation={look.backgroundSaturation}
                    width={width}
                    height={height}
                />
            )}
            {framed
                ? (
                        <>
                            <Region
                                name="photoSplashScreen"
                                layout={{ position: 'absolute', left: Math.trunc((width - SPLASH_WIDTH) / 2), top, width: SPLASH_WIDTH, height: SPLASH_HEIGHT }}
                            >
                                <ThemeImage
                                    src="loading-screen-splash_bg"
                                    bitmap={{}}
                                    layout={{ position: 'absolute', left: 0, top: 0, width: SPLASH_WIDTH, height: SPLASH_HEIGHT }}
                                />
                                <ThemeImage
                                    src={`loading-screen-userphoto_${photo}`}
                                    bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                    layout={{ position: 'absolute', left: PHOTO_X, top: PHOTO_Y }}
                                />
                                <ThemeImage
                                    src="loading-screen-splash_top"
                                    bitmap={{}}
                                    layout={{ position: 'absolute', left: 0, top: 0, width: SPLASH_WIDTH, height: SPLASH_HEIGHT }}
                                />
                            </Region>
                            <Box layout={{ position: 'absolute', left: 0, top: captionTop, width, flexDirection: 'column', alignItems: 'center' }}>
                                {stack}
                            </Box>
                        </>
                    )
                : (
                        // No photo frame: the stack centred 20 above the middle, as Habbo's block is, on the hotel's panel when it has one.
                        <Box layout={{ position: 'absolute', left: 0, top: 0, width, height: height - (SPACING * 4), alignItems: 'center', justifyContent: 'center' }}>
                            <Box layout={{ width: box?.width, height: box?.height, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {box && (
                                    <pixiGraphics
                                        eventMode="none"
                                        draw={(g: Graphics) => {
                                            g.clear();
                                            g.roundRect(0, 0, box.width, box.height, box.radius).fill({ color: box.color, alpha: box.alpha });
                                        }}
                                    />
                                )}
                                {stack}
                            </Box>
                        </Box>
                    )}
        </Region>
    );
};
