import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { usePixiTexture, useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeImage } from './ThemeImage';
import { ThemeProps, ThemeVariant, ThemeVariants } from './utils';

export type ScalerVariant = ThemeVariant;

const CURSOR_BY_DIRECTION: Record<ScalerDirection, string> = {
    x: 'ew-resize',
    y: 'ns-resize',
    all: 'nwse-resize',
    none: 'default',
};

const SCALER_VARIANTS: ThemeVariants<ScalerVariant> = {
    0: {
        layer: Stretch('scaler-0-default-src'),
        overlay: Stretch('scaler-0-default-shine-src'),
        zIndex: 20,
        layout: {
            right: 0,
            bottom: 0,
        },
    },
    1: {
        layer: Stretch('scaler-0-default-src'),
        overlay: Stretch('scaler-0-default-shine-src'),
    },
    2: {
        layer: Stretch('scaler-0-default-src'),
        overlay: Stretch('scaler-0-default-shine-src'),
    },
    3: {
        layer: Stretch('scaler-3-default-src'),
        layout: {
            position: 'absolute',
            right: 3,
            bottom: 4,
            width: 20,
            height: 20,
        },
    },
    // Style 4 is `habbo_skin_scaler_3` as well, so it draws style 3's piece.
    4: {
        layer: Stretch('scaler-3-default-src'),
    },
    // `renderer="null"`: a scaler with no art, as big as its layout makes it
    100: {
        zIndex: 20,
    },
};

export type ScalerDirection = 'x' | 'y' | 'all' | 'none';

export interface ScalerProps extends ThemeProps<ScalerVariant> {
    direction?: ScalerDirection;
}

export const Scaler: ForwardRefExoticComponent<ScalerProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScalerProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, direction = 'all',
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'scaler', variants: SCALER_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor,
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
                    zIndex={config.zIndex}
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
                zIndex={config.zIndex}
                layout={{
                    position: 'absolute',
                    width: skinTexture?.width,
                    height: skinTexture?.height,
                    ...config.layout,
                    ...layout,
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
