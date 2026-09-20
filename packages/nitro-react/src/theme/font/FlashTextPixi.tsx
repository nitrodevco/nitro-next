import { Texture } from 'pixi.js';
import { useEffect, useMemo } from 'react';

import { BoxLayout } from '../Box';
import { insetStretchAxes } from '../utils/layoutInsetStretch';
import { FlashTextCanvas } from './flash-text';

export interface FlashTextPixiProps {
    /** The rasterised text - see `useFlashTextCanvas`. */
    rendered: FlashTextCanvas;
    layout?: BoxLayout;
    visible?: boolean;
    alpha?: number;
    /** A pixel nudge on top of the layout position (a dynamic style's `offsetX`/`offsetY`). */
    x?: number;
    y?: number;
}

/**
 * Flash-exact text as one sprite. The bitmap is shown 1:1 with nearest-neighbour sampling: the
 * rasterizer already grid-fitted every glyph to whole pixels, and any resampling would undo it.
 */
export const FlashTextPixi = ({ rendered, layout, visible, alpha, x, y }: FlashTextPixiProps) => {
    const texture = useMemo(() => {
        // Owned here and destroyed on change - kept out of Pixi's global `Cache`, which would
        // otherwise hold every label's canvas until that destroy.
        const created = Texture.from(rendered.canvas, true);

        created.source.scaleMode = 'nearest';

        return created;
    }, [ rendered ]);

    useEffect(() => () => texture.destroy(true), [ texture ]);

    const stretchAxes = insetStretchAxes(layout);
    const sprite = (spriteLayout: BoxLayout | undefined, nudge: boolean) => (
        <pixiSprite
            texture={texture}
            visible={visible}
            alpha={alpha}
            x={nudge ? x : undefined}
            y={nudge ? y : undefined}
            roundPixels
            layout={{
                width: texture.width,
                height: texture.height,
                objectFit: 'none',
                flexShrink: 0,
                ...spriteLayout,
            }}
        />
    );

    // A leaf sprite won't span between insets (it keeps its intrinsic size) - a container host
    // does the spanning, the text fills it and aligns itself via its objectPosition.
    if (stretchAxes.x || stretchAxes.y) {
        return (
            <pixiContainer
                eventMode="none"
                x={x}
                y={y}
                layout={layout}
            >
                {sprite({ objectPosition: layout?.objectPosition, width: stretchAxes.x ? '100%' : undefined, height: stretchAxes.y ? '100%' : undefined }, false)}
            </pixiContainer>
        );
    }

    return sprite(layout, true);
};

FlashTextPixi.displayName = 'FlashTextPixi';
