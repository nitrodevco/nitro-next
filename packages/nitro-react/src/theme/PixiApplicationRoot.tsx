import { GetRoomStage, SetRenderer } from '@nitrodevco/nitro-renderer';
import { Application } from '@pixi/react';
import { Application as PixiApplication, RendererType, WebGLRenderer } from 'pixi.js';
import { ReactNode, useCallback, useRef } from 'react';

import { useConfigValue } from '#base/context/system';
import { GetPixelRatio } from '#base/utils';

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
    children?: ReactNode;
}

export const PixiApplicationRoot = ({ onReady, children }: PixiApplicationRootProps) => {
    const readyRef = useRef(false);
    const colorSpace = useConfigValue<string>(COLOR_SPACE_KEY);

    const handleInit = useCallback((app: PixiApplication) => {
        if (readyRef.current) return;

        readyRef.current = true;

        SetRenderer(app.renderer);
        applyCanvasColorSpace(app, colorSpace);

        app.stage.addChild(GetRoomStage());
        app.stage.sortableChildren = false;

        const applyScreenLayout = () => {
            app.stage.layout = {
                width: app.renderer.screen.width,
                height: app.renderer.screen.height,
                position: 'relative',
            };
        };

        applyScreenLayout();
        app.renderer.on('resize', applyScreenLayout);

        onReady();
    }, [ onReady, colorSpace ]);

    return (
        <Application
            className="fixed inset-0 z-0 size-full [image-rendering:pixelated]"
            onInit={handleInit}
            resizeTo={window}
            resolution={GetPixelRatio()}
            autoDensity={true}
            backgroundAlpha={0}
            roundPixels={false}
            preference="webgpu"
            preserveDrawingBuffer={false}
            sharedTicker
        >
            {children}
        </Application>
    );
};
