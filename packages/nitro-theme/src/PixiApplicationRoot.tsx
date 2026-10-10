// The blend modes Pixi draws as filters - Flash's `subtract` and `invert` (`utils/flashBlendMode.ts`).
import 'pixi.js/advanced-blend-modes';

import { SetRenderer, TextureUtils } from '@nitrodevco/nitro-renderer';
import { Application } from '@pixi/react';
import { Application as PixiApplication, RendererType, WebGLRenderer } from 'pixi.js';
import { ReactNode, useCallback, useRef } from 'react';

import { useThemeConfigValue } from './host';
import { setAdvancedBlendModes } from './utils/flashBlendMode';
import { GetPixelRatio } from './utils/GetPixelRatio';
import { guardLayoutViewSizes } from './utils/layoutViewSizeGuard';
import { gateLayoutWalk } from './utils/layoutWalkGate';

/** `renderer.color.space` in nitro-config.json: the port's own key - Flash drew in sRGB and had no such setting. */
const COLOR_SPACE_KEY = 'renderer.color.space';

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

interface PixiApplicationRootProps {
    onReady: () => void;
    /**
     * Once the renderer is up, before anything is drawn: what the app puts on the stage under the UI
     * (the client's room stage).
     */
    onInit?: (app: PixiApplication) => void;
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
const FULL_WINDOW_CANVAS = 'position: fixed; inset: 0; z-index: 0; width: 100%; height: 100%; image-rendering: pixelated;';

export const PixiApplicationRoot = ({ onReady, onInit, resizeTo = window, canvasStyle = FULL_WINDOW_CANVAS, children }: PixiApplicationRootProps) => {
    const readyRef = useRef(false);
    const colorSpace = useThemeConfigValue<string>(COLOR_SPACE_KEY);

    const handleInit = useCallback((app: PixiApplication) => {
        if (readyRef.current) return;

        readyRef.current = true;

        app.canvas.style = canvasStyle;
        // Replacing the style dropped the `touch-action: none` Pixi's EventSystem set on the canvas:
        // without it a finger dragged across the canvas is the browser's pan or zoom, which cancels
        // the pointer a few pixels in and leaves the room (or any drag) stuck.
        app.canvas.style.touchAction = 'none';

        SetRenderer(app.renderer);
        setAdvancedBlendModes(app.renderer);
        applyCanvasColorSpace(app, colorSpace);

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

        onReady();
    }, [ onReady, onInit, colorSpace, canvasStyle ]);

    return (
        <Application
            onInit={handleInit}
            resizeTo={resizeTo ?? undefined}
            resolution={GetPixelRatio()}
            autoDensity={true}
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
