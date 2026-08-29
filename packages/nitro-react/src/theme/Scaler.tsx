import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeProps } from './utils';
import { SCALER_VARIANTS, ScalerVariant } from './variants/scaler';

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
