import { BLEND_MODES, Container as PixiContainer } from 'pixi.js';
import { forwardRef, useEffect, useMemo, useState } from 'react';

import { Box, BoxLayout } from './Box';
import { textureFromCanvas, useLayoutSize } from './hooks';
import { deriveHsvLayerColor, ThemeLayoutMeta } from './utils';
import { flashColorFromString, rasterizeShape, ShapeKind } from './utils/shapeRaster';

export type { ShapeKind } from './utils/shapeRaster';

export interface ShapeProps extends ThemeLayoutMeta {
    /** `ShapeController.shape`; anything else is `rectangle` (`normalizeShape`). */
    shape?: ShapeKind;
    /** The window colour - the fill. A colour with no alpha byte draws opaque, as Flash's alpha-0 layout colour does. */
    color?: string;
    /** `stroke_color` (`ShapeController` defaults it to opaque black). */
    strokeColor?: string;
    /** `stroke_thickness`; nothing is stroked below 0.5 (`snappedThickness`). */
    strokeThickness?: number;
    /** `stroke_hsv_shade`: when non-zero the stroke is `HsvLayerColor.deriveColor(color, shade)` and `strokeColor` is ignored. */
    strokeHsvShade?: number;
    /** `radius` of a `round_rectangle`. */
    radius?: number;
    /** The window's `blend`. */
    alpha?: number;
    blendMode?: BLEND_MODES;
    layout?: BoxLayout;
}

/**
 * The Flash `shape` window (`ShapeController`), drawn the way `ShapeSkinRenderer.draw` draws it:
 * rasterised at the window's laid-out size into one canvas texture shown 1:1 - see
 * `utils/shapeRaster.ts` for the per-pixel rules. A size the layout states is used directly;
 * one Yoga works out (insets, percentages) is read back once laid out, and nothing is drawn
 * before that.
 */
export const Shape = forwardRef<PixiContainer, ShapeProps>(({
    shape = 'rectangle', color = '#ffffff', strokeColor = '#000000', strokeThickness = 0, strokeHsvShade = 0, radius = 0, alpha, blendMode, layout, visible,
}, ref) => {
    const [ host, setHost ] = useState<PixiContainer | null>(null);
    const measured = useLayoutSize(host);
    const width = Math.round((typeof layout?.width === 'number') ? layout.width : measured.width);
    const height = Math.round((typeof layout?.height === 'number') ? layout.height : measured.height);
    const fill = flashColorFromString(color, 0xFFFFFFFF);
    const stroke = strokeHsvShade ? flashColorFromString(deriveHsvLayerColor(`#${(fill & 0xFFFFFF).toString(16).padStart(6, '0')}`, strokeHsvShade), 0xFF000000) : flashColorFromString(strokeColor, 0xFF000000);

    const texture = useMemo(() => {
        const canvas = rasterizeShape({ shape, width, height, color: fill, strokeColor: stroke, strokeThickness, radius });

        return canvas ? textureFromCanvas(canvas, `shape:${shape}`) : undefined;
    }, [ shape, width, height, fill, stroke, strokeThickness, radius ]);

    // Owned here: destroyed once the sprite showing its replacement has committed.
    useEffect(() => () => texture?.destroy(true), [ texture ]);

    return (
        <Box
            ref={(node: PixiContainer | null) => {
                setHost(node);

                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
            }}
            visible={visible}
            alpha={alpha}
            blendMode={blendMode}
            layout={layout ?? {}}
        >
            {texture && (
                <pixiSprite
                    texture={texture}
                    eventMode="none"
                    roundPixels
                    layout={{ position: 'absolute', left: 0, top: 0, width: texture.width, height: texture.height }}
                />
            )}
        </Box>
    );
});

Shape.displayName = 'Shape';
