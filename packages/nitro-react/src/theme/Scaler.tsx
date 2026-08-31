import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
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
        layer: Stretch('scaler-src'),
        layout: {
            position: 'absolute',
            right: 3,
            bottom: 4,
            width: 20,
            height: 20,
        },
    },
    4: {
        layer: Stretch('scaler-src'),
    },
};

export type ScalerDirection = 'x' | 'y' | 'all' | 'none';

export interface ScalerProps extends ThemeProps<ScalerVariant> {
    direction?: ScalerDirection;
}

export const Scaler: ForwardRefExoticComponent<ScalerProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScalerProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, visible, direction = 'all',
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'scaler', variants: SCALER_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

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
                    cursor={CURSOR_BY_DIRECTION[direction]}
                    {...handlers}
                    layout={{ position: 'absolute', ...config.layout, ...layout }}
                />
            );
        }

        // TODO - layer size to fit image
        return (
            <Box
                ref={ref}
                visible={visible}
                zIndex={config.zIndex}
                layout={{
                    position: 'absolute',
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
