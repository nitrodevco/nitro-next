import { BLEND_MODES, Container as PixiContainer } from 'pixi.js';
import { forwardRef, ReactNode, useEffect, useMemo, useState } from 'react';

import { Box, BoxLayout } from './Box';
import { textureFromCanvas, useLayoutSize } from './hooks';
import { ThemeLayoutMeta } from './utils';
import { GradientDirection, GradientMode, rasterizeGradient } from './utils/gradientRaster';

export type { GradientDirection, GradientMode } from './utils/gradientRaster';

export interface GradientProps extends ThemeLayoutMeta {
    /** `color1`, ARGB - the start stop (`GradientController.DEFAULT_COLOR1`, opaque white). An alpha byte of 0 is opaque. */
    color1?: number;
    /** `color2`, ARGB - the end stop (`DEFAULT_COLOR2`, opaque black). */
    color2?: number;
    /** `mode` (`normalizeMode`: anything but `radial` is `linear`). */
    mode?: GradientMode;
    /** `direction` of a linear fill, towards `color2` (`DEFAULT_DIRECTION`, `down`); a radial fill ignores it. */
    direction?: GradientDirection;
    /** The window's `blend`. */
    alpha?: number;
    blendMode?: BLEND_MODES;
    layout?: BoxLayout;
    children?: ReactNode;
}

/**
 * The Flash `gradient` window (`GradientController`), drawn the way `GradientSkinRenderer.draw`
 * draws it - see `utils/gradientRaster.ts` - into one canvas texture at the window's laid-out
 * size, shown 1:1 behind its children. A size the layout states is used directly; one Yoga works
 * out is read back once laid out.
 */
export const Gradient = forwardRef<PixiContainer, GradientProps>(({
    color1 = 0xFFFFFFFF, color2 = 0xFF000000, mode = 'linear', direction = 'down', alpha, blendMode, layout, visible, children,
}, ref) => {
    const [ host, setHost ] = useState<PixiContainer | null>(null);
    const measured = useLayoutSize(host);
    const width = Math.round((typeof layout?.width === 'number') ? layout.width : measured.width);
    const height = Math.round((typeof layout?.height === 'number') ? layout.height : measured.height);
    const resolvedMode: GradientMode = (mode === 'radial') ? 'radial' : 'linear';

    const texture = useMemo(() => {
        const canvas = rasterizeGradient({ width, height, color1: color1 >>> 0, color2: color2 >>> 0, mode: resolvedMode, direction });

        return canvas ? textureFromCanvas(canvas, `gradient:${resolvedMode}:${direction}`) : undefined;
    }, [ width, height, color1, color2, resolvedMode, direction ]);

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
            {children}
        </Box>
    );
});

Gradient.displayName = 'Gradient';
