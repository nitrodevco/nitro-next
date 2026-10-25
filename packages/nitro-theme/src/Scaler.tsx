import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { usePixiTexture, useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeImage } from './ThemeImage';
import { expandSides, ThemeProps, ThemeVariant } from './utils';

export type ScalerVariant = ThemeVariant;

/**
 * Over the content area (20), because `_FRAME_SCALER` is the last child of every frame's
 * window layout - the content's own background drew over the corner otherwise.
 */
const SCALER_Z_INDEX = 30;

const CURSOR_BY_DIRECTION: Record<ScalerDirection, string> = {
    x: 'ew-resize',
    y: 'ns-resize',
    all: 'nwse-resize',
    none: 'default',
};

export type ScalerDirection = 'x' | 'y' | 'all' | 'none';

export interface ScalerProps extends ThemeProps<ScalerVariant> {
    direction?: ScalerDirection;
}

/**
 * Flash's `ScalerController` (`scaler`): a frame's resize corner, its skin at its own size over the
 * content, with the resize cursor of its direction; `Frame` hands it the drag (`useFrameResize`).
 */
export const Scaler: ForwardRefExoticComponent<ScalerProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScalerProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, direction = 'all',
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant<ScalerVariant>({
            cascadeKey: 'scaler', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        // The skin's own size: Flash's scaler is as big as its bitmap unless its layout says otherwise.
        const skinTexture = usePixiTexture((resolvedLayer?.kind === 'sprite') ? resolvedLayer.textureKey : undefined);

        if (!config || direction === 'none') return null;

        // A plain sprite skin with nothing layered over it is the sprite itself - one node, no Box.
        if (resolvedLayer?.kind === 'sprite' && !resolvedOverlay) {
            return (
                <ThemeImage
                    ref={ref}
                    textureKey={resolvedLayer.textureKey}
                    frame={resolvedLayer.frame}
                    tint={resolvedTint}
                    stretch
                    visible={visible}
                    zIndex={config.zIndex ?? SCALER_Z_INDEX}
                    {...handlers}
                    cursor={CURSOR_BY_DIRECTION[direction]}
                    layout={{ position: 'absolute', ...config.layout, ...layout }}
                />
            );
        }

        // A skin with its shine laid over it: sized to the skin bitmap, which both layers stretch to.
        return (
            <Box
                ref={ref}
                visible={visible}
                zIndex={config.zIndex ?? SCALER_Z_INDEX}
                layout={{
                    position: 'absolute',
                    width: skinTexture?.width,
                    height: skinTexture?.height,
                    ...expandSides(config.layout),
                    ...expandSides(layout),
                }}
                {...handlers}
                cursor={CURSOR_BY_DIRECTION[direction]}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
            </Box>
        );
    },
);

Scaler.displayName = 'Scaler';
