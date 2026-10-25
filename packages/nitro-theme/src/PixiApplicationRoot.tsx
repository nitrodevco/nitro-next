/**
 * The one Pixi application the UI and the app's own stage (the client's room) share: it owns the
 * canvas React DOM mounts, starts the renderer (`SetRenderer`, Flash's blend modes, the configured
 * colour space) and lays the UI's render group out over the whole screen.
 */
// The blend modes Pixi draws as filters - Flash's `subtract` and `invert` (`utils/flashBlendMode.ts`).
import 'pixi.js/advanced-blend-modes';

import { SetRenderer, TextureUtils } from '@nitrodevco/nitro-renderer';
import { Application } from '@pixi/react';
import { Application as PixiApplication, RendererType, WebGLRenderer } from 'pixi.js';
import { ReactNode, useCallback, useRef } from 'react';

import { useThemeConfigValue } from './host';
import { setAdvancedBlendModes } from './utils/flashBlendMode';
import { GetCanvasImageRendering, GetDeviceRatio, GetPixelRatio, SetDesktopSize, SetStagePixelScale } from './utils/GetPixelRatio';
import { GpuLoss, guardGpuLoss } from './utils/gpuLossGuard';
import { guardLayoutViewSizes } from './utils/layoutViewSizeGuard';
import { gateLayoutWalk } from './utils/layoutWalkGate';
import { gateRendering } from './utils/renderGate';

/** `renderer.color.space` in nitro-config.json: the port's own key - Flash drew in sRGB and had no such setting. */
const COLOR_SPACE_KEY = 'renderer.color.space';
/** `false` draws every tick, as before `renderGate` - should something show late with it. */
const RENDER_ON_DEMAND_KEY = 'renderer.render_on_demand';

/**
 * Puts the canvas in the `display-p3` colour space when the config asks for it
 * (`renderer.color.space`); anything else, or no value, leaves the browser's sRGB. It is read once,
 * when the renderer starts. Pixi has no option for it: under WebGPU it
 * configures the canvas's context itself when the screen is first rendered to
 * (`GpuRenderTargetAdaptor.initGpuRenderTarget`), so the context's `configure` is wrapped to add the
 * colour space to that call - and to whatever configuration is already there, should the first
 * render have come first. Under WebGL it is the drawing buffer's `drawingBufferColorSpace`.
 *
 * Nothing drawn is converted: the art, the text and every colour value are sRGB, and a P3 canvas
 * shows the same values in its wider gamut, so on a P3 display the whole client draws more
 * saturated than the Flash client did. On an sRGB display, and in a browser without P3 canvases,
 * nothing changes.
 */
const applyCanvasColorSpace = (app: PixiApplication, colorSpace: string | undefined) => {
    if (colorSpace !== 'display-p3') return;

    if (Number(app.renderer.type) === Number(RendererType.WEBGPU)) {
        const context = app.canvas.getContext('webgpu');

        if (!context) return;

        const configure = context.configure.bind(context);

        context.configure = configuration => configure({ ...configuration, colorSpace: 'display-p3' });

        const current = context.getConfiguration?.();

        if (current) context.configure(current);

        return;
    }

    if (Number(app.renderer.type) === Number(RendererType.WEBGL)) {
        const gl = (app.renderer as WebGLRenderer).gl;

        if ('drawingBufferColorSpace' in gl) gl.drawingBufferColorSpace = 'display-p3';
    }
};

/**
 * Reports the canvas's box in the screen's own pixels as it changes, where the browser can (not
 * Safari); false where it cannot.
 */
const observeDevicePixelSize = (canvas: HTMLCanvasElement, onChange: (size: { width: number; height: number }) => void): boolean => {
    if ((typeof ResizeObserver !== 'function') || (typeof ResizeObserverEntry !== 'function') || !('devicePixelContentBoxSize' in ResizeObserverEntry.prototype)) return false;

    const observer = new ResizeObserver((entries) => {
        const box = entries[entries.length - 1]?.devicePixelContentBoxSize?.[0];

        if (box) onChange({ width: box.inlineSize, height: box.blockSize });
    });

    try {
        observer.observe(canvas, { box: 'device-pixel-content-box' });
    } catch {
        observer.disconnect();

        return false;
    }

    return true;
};

/**
 * Keeps the renderer at `GetPixelRatio` as the device ratio changes - the browser zoomed, the window
 * moved to another screen - as Habbo's JS port checks it every tick; here a media query for the
 * current ratio says when it stops matching, and every resize checks it again.
 *
 * The window's canvas (`fitsWindow`) keeps its CSS box over the whole window and its backing store
 * at that box's size in screen pixels, so nothing is resampled on the way to the screen; the stage
 * is that size over the resolution. Where the browser does not report the box in screen pixels its
 * CSS size times the ratio stands in. A canvas the app sizes itself stays in CSS pixels (`autoDensity`).
 */
const followPixelRatio = (app: PixiApplication, fitsWindow: boolean) => {
    let deviceSize: { width: number; height: number } | undefined;
    let resizing = false;

    /**
     * `renderer.resize`, with the screen brought up to date when only the resolution changed. Pixi's
     * `TextureSource.resize` skips its resize event when the pixel size stays the same - a browser
     * zoom: the same screen pixels, more or fewer stage pixels - so the canvas texture's frame, and
     * the screen read off it, kept the old size: the stage laid out for one size and the pointer
     * mapped for another. The texture reads its frame again, and the second resize tells the
     * listeners the size the first one could not.
     */
    const resize = (width: number, height: number, resolution: number) => {
        const { renderer } = app;
        const { texture } = renderer.view;

        resizing = true;

        try {
            renderer.resize(width, height, resolution);

            if ((renderer.screen.width === texture.source.width) && (renderer.screen.height === texture.source.height)) return;

            texture.update();
            renderer.resize(width, height, resolution);
        } finally {
            resizing = false;
        }
    };

    /** True when the renderer was resized. */
    const apply = (): boolean => {
        // The resize's own event, before it is finished.
        if (resizing) return false;

        const ratio = GetDeviceRatio();
        const resolution = GetPixelRatio();
        const { renderer } = app;

        app.canvas.style.imageRendering = GetCanvasImageRendering(fitsWindow);

        if (!fitsWindow) {
            SetStagePixelScale(1);
            SetDesktopSize(undefined);

            if (resolution === renderer.resolution) return false;

            resize(renderer.screen.width, renderer.screen.height, resolution);

            return true;
        }

        SetStagePixelScale(ratio / resolution);

        const width = Math.max(1, deviceSize?.width ?? Math.round(window.innerWidth * ratio)) / resolution;
        const height = Math.max(1, deviceSize?.height ?? Math.round(window.innerHeight * ratio)) / resolution;

        // Before the resize, so what its listeners read is the new size.
        SetDesktopSize({ width: Math.floor(width), height: Math.floor(height) });

        if ((width === renderer.screen.width) && (height === renderer.screen.height) && (resolution === renderer.resolution)) return false;

        resize(width, height, resolution);

        return true;
    };

    if (fitsWindow) {
        observeDevicePixelSize(app.canvas, (size) => {
            deviceSize = size;

            // The observer reports after the frame was drawn: resizing cleared the canvas, so it is
            // drawn again before the browser shows it empty.
            if (apply()) app.render();
        });
        // Sizes the canvas where the observer cannot, and catches a browser zoom, which changes the
        // ratio but not the screen pixels the canvas covers (so the observer may not report).
        window.addEventListener('resize', () => apply());
    }

    const listen = () => {
        if (typeof window.matchMedia !== 'function') return;

        window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).addEventListener('change', () => {
            apply();
            listen();
        }, { once: true });
    };

    apply();
    listen();
    // A browser zoom also resizes the window: checked there too, should the query's change be missed.
    app.renderer.on('resize', apply);
};

interface PixiApplicationRootProps {
    onReady: () => void;
    /**
     * Once the renderer is up, before anything is drawn: what the app puts on the stage under the UI
     * (the client's room stage).
     */
    onInit?: (app: PixiApplication) => void;
    /**
     * The GPU device or context was lost: what was drawn into textures is gone, even once Pixi has
     * restored it (`utils/gpuLossGuard.ts`).
     */
    onGpuLost?: (loss: GpuLoss) => void;
    /**
     * What the canvas is as big as: the window (the client's), or nothing - the app sizes it itself
     * (`app.renderer.resize`), as a canvas moved between boxes on a page is (Nitro Studio's previews).
     */
    resizeTo?: Window | null;
    /** The canvas's own style: fixed over the whole window, unless the app places it itself. */
    canvasStyle?: string;
    children?: ReactNode;
}

/** The UI's render group: the whole stage, which is the screen's size (`applyScreenLayout`). */
const UI_LAYOUT = { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' } as const;

/** The client's canvas: the whole window, under everything else on the page. */
const FULL_WINDOW_CANVAS = 'position: fixed; inset: 0; z-index: 0; width: 100%; height: 100%;';

export const PixiApplicationRoot = ({ onReady, onInit, onGpuLost, resizeTo = window, canvasStyle = FULL_WINDOW_CANVAS, children }: PixiApplicationRootProps) => {
    const readyRef = useRef(false);
    const colorSpace = useThemeConfigValue<string>(COLOR_SPACE_KEY);
    const renderOnDemand = (useThemeConfigValue<boolean>(RENDER_ON_DEMAND_KEY) !== false);
    const fitsWindow = (resizeTo === window);

    const handleInit = useCallback((app: PixiApplication) => {
        if (readyRef.current) return;

        readyRef.current = true;

        app.canvas.style = canvasStyle;
        // Replacing the style dropped the `touch-action: none` Pixi's EventSystem set on the canvas:
        // without it a finger dragged across the canvas is the browser's pan or zoom, which cancels
        // the pointer a few pixels in and leaves the room (or any drag) stuck.
        app.canvas.style.touchAction = 'none';
        followPixelRatio(app, fitsWindow);

        SetRenderer(app.renderer);
        setAdvancedBlendModes(app.renderer);
        applyCanvasColorSpace(app, colorSpace);
        // A lost GPU starts the client again; a lost WebGPU device's frames are skipped until then.
        guardGpuLoss(app.renderer, onGpuLost);

        onInit?.(app);
        app.stage.sortableChildren = false;
        // Its sprites draw pooled and owned textures; one destroyed must not stay in a cached batch.
        TextureUtils.watchBatches(app.stage);

        const applyScreenLayout = () => {
            app.stage.layout = {
                width: app.renderer.screen.width,
                height: app.renderer.screen.height,
                position: 'relative',
            };
        };

        applyScreenLayout();
        app.renderer.on('resize', applyScreenLayout);
        // The stage's layout walk runs only after something in its layout changed.
        gateLayoutWalk(app.renderer, app.stage);
        // A nine-slice or tiling sprite once laid out at 0 would stay `NaN` sized.
        guardLayoutViewSizes();
        // The frame is drawn only when something on it changed.
        if (renderOnDemand) gateRendering(app);

        onReady();
    }, [ onReady, onInit, onGpuLost, colorSpace, canvasStyle, renderOnDemand, fitsWindow ]);

    return (
        <Application
            onInit={handleInit}
            resolution={GetPixelRatio()}
            // The window's canvas is sized in screen pixels by `followPixelRatio`, its CSS box left
            // over the whole window; any other is sized by the app, in CSS pixels.
            autoDensity={!fitsWindow}
            backgroundAlpha={0}
            roundPixels={false}
            preference="webgpu"
            preserveDrawingBuffer={false}
            sharedTicker
        >
            {/* The UI is a render group of its own: what changes in the room under it (sprites
                added, hidden, re-textured every frame) rebuilds only the stage's instructions, and
                a window opening or a text changing rebuilds only the UI's - each keeps its batches
                while the other changes. It fills the stage, so the UI lays out against the screen
                as it did on the stage itself. */}
            <pixiContainer
                label="ui"
                isRenderGroup
                layout={UI_LAYOUT}
            >
                {children}
            </pixiContainer>
        </Application>
    );
};
