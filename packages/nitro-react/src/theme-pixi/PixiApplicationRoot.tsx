

import { GetRoomStage, SetRenderer } from '@nitrodevco/nitro-renderer';
import { Application } from '@pixi/react';
import { type Application as PixiApplication } from 'pixi.js';
import { type ReactNode, useCallback, useRef } from 'react';

interface PixiApplicationRootProps {
    onReady: () => void;
    children?: ReactNode;
}

export const PixiApplicationRoot = ({ onReady, children }: PixiApplicationRootProps) => {
    const readyRef = useRef(false);

    const handleInit = useCallback((app: PixiApplication) => {
        if (readyRef.current) return;

        readyRef.current = true;

        SetRenderer(app.renderer);

        app.stage.addChild(GetRoomStage());
        app.stage.sortableChildren = true;

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
    }, [ onReady ]);

    return (
        <Application
            className="fixed inset-0 z-0 size-full"
            onInit={handleInit}
            resizeTo={window}
            resolution={1}
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
