/** The device pixel ratio, or 1 where the browser gives none. */
export const GetDeviceRatio = () => ((Number.isFinite(window.devicePixelRatio) && (window.devicePixelRatio > 0)) ? window.devicePixelRatio : 1);

/**
 * The renderer's resolution: the device pixel ratio cut down to a whole number, at least 1. The
 * client's canvas covers the screen's own pixels (`PixiApplicationRoot`), so pixel art drawn at a
 * whole resolution lands on them one to one: at 125%, 150% or 175% Windows scaling the client draws
 * a stage pixel per screen pixel - smaller than the page's CSS pixels, but never resampled. Drawing
 * at 1 and letting the browser stretch the canvas by the ratio, as Habbo's JS port does, blurred
 * every edge; drawing at the fractional ratio itself doubles every fourth pixel row and column at 1.25.
 */
export const GetPixelRatio = () => Math.max(1, Math.floor(GetDeviceRatio()));

/**
 * How the browser scales the canvas to the screen: whole pixels where its backing store matches
 * the screen's pixels (the client's canvas, or any canvas at a whole ratio), smoothly otherwise.
 */
export const GetCanvasImageRendering = (fitsScreenPixels: boolean) => ((fitsScreenPixels || Number.isInteger(GetDeviceRatio())) ? 'pixelated' : 'auto');

let stagePixelScale = 1;

/**
 * Stage pixels per CSS pixel: the device ratio over the resolution for the client's canvas (1.25 at
 * 125% Windows scaling, 1 at any whole ratio), 1 for a canvas sized in CSS pixels (Nitro Studio's).
 * `PixiApplicationRoot` keeps it up to date.
 */
export const GetStagePixelScale = () => stagePixelScale;

export const SetStagePixelScale = (scale: number) => {
    stagePixelScale = (Number.isFinite(scale) && (scale > 0)) ? scale : 1;
};

/**
 * A DOM length in stage pixels: a pointer's `clientX` / `clientY` (Pixi's `client` included) and
 * their deltas, or the window's `innerWidth` / `innerHeight` - none of them are the stage's own units.
 */
export const ClientToStage = (value: number) => value * stagePixelScale;

/** A DOM pointer position as a point on the stage of `canvas`. */
export const ClientPointToStage = (canvas: HTMLCanvasElement, clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();

    return { x: ClientToStage(clientX - rect.left), y: ClientToStage(clientY - rect.top) };
};

let desktopSize: { width: number; height: number } | undefined;

/** The stage's size when it covers the window (`PixiApplicationRoot`); undefined for any other canvas. */
export const SetDesktopSize = (size: { width: number; height: number } | undefined) => {
    desktopSize = size;
};

/**
 * The window's size in stage pixels: Flash's `desktop` size, for clamping and centring windows -
 * the stage's own size where it covers the window, else the window's scaled.
 */
export const GetDesktopSize = () => (desktopSize
    ? { width: desktopSize.width, height: desktopSize.height }
    : { width: Math.floor(ClientToStage(window.innerWidth)), height: Math.floor(ClientToStage(window.innerHeight)) });
