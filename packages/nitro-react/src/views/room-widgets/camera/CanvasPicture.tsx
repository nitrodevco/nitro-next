import { TextureUtils } from '@nitrodevco/nitro-renderer';
import { CanvasSource, Texture } from 'pixi.js';
import { useEffect, useMemo } from 'react';

/** A canvas drawn as a texture that is refreshed in place - an `IBitmapWrapperWindow`'s bitmap the code draws into. */
/** `transient`: the canvas is drawn once and replaced by a new one, so its texture goes with it. */
export const CanvasPicture = ({ canvas, size, offset = 0, onNode, transient = false }: { canvas: HTMLCanvasElement; size: number; offset?: number; onNode?: (node: unknown) => void; transient?: boolean }) => {
    const texture = useMemo(() => (transient ? new Texture({ source: new CanvasSource({ resource: canvas }) }) : Texture.from(canvas)), [ canvas, transient ]);

    // Destroyed after the frame that still draws it, with the UI's batches rebuilt first: a batch keeps the
    // texture bound until then, and a bound texture destroyed is a "PixiJS Warning [BindGroup]" each time.
    useEffect(() => () => {
        if (transient) setTimeout(() => TextureUtils.destroyTexture(texture), 0);
    }, [ texture, transient ]);

    // Every render is a redraw of the canvas.
    useEffect(() => {
        texture.source.update();
    });

    return (
        <pixiSprite
            ref={onNode}
            texture={texture}
            layout={{ position: 'absolute', left: offset, top: offset, width: size, height: size }}
        />
    );
};
