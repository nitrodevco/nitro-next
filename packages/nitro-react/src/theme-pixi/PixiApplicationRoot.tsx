import './utils/pixiElements';

import { GetStage, SetRenderer } from '@nitrodevco/nitro-renderer';
import { Application } from '@pixi/react';
import type { Application as PixiApplication } from 'pixi.js';
import { type ReactNode, useCallback, useRef } from 'react';

import { GetPixelRatio } from '#base/utils';

interface PixiApplicationRootProps {
    /** Fired once the shared renderer is ready and GetRenderer()/GetStage() can be used. */
    onReady: () => void;
    children?: ReactNode;
}

/**
 * Owns the single Pixi Application/renderer/canvas for the whole app - both the room and
 * the Pixi-rendered UI render through it, so a texture used by both is uploaded to the GPU
 * once. See the "invert the render bootstrap" section of the phase-1 plan for why: @pixi/react
 * always creates its own Application/renderer (confirmed from its source), so instead of
 * bolting a second renderer onto the room's existing one, this Application becomes the one
 * renderer, and the room's existing stage (GetStage()) is mounted into it.
 */
export const PixiApplicationRoot = ({ onReady, children }: PixiApplicationRootProps) => {
    const readyRef = useRef(false);

    const handleInit = useCallback((app: PixiApplication) => {
        if (readyRef.current) return;

        readyRef.current = true;

        SetRenderer(app.renderer);

        // Room subtree first (bottom of the stack, renders under the UI). GetStage() keeps
        // its own eventMode = 'none' (set in nitro-renderer/GetStage.ts), so it stays opted
        // out of Pixi's event system regardless of where it's nested - the room does its own
        // mouse hit-testing (see hooks/room/useRoomMouse.tsx).
        app.stage.addChild(GetStage());

        // For future window z-order (SystemStore's zIndexById) once Frame is ported.
        app.stage.sortableChildren = true;

        onReady();
    }, [onReady]);

    return (
        <Application
            className="fixed inset-0 z-0 size-full"
            onInit={handleInit}
            resizeTo={window}
            resolution={GetPixelRatio()}
            autoDensity
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
