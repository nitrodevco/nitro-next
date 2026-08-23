import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { ThemeProps, ThemeVariant, ThemeVariants } from '#base/theme-core';

import { Box } from './Box';
import { BackgroundLayer, Stretch } from './layer';
import { useThemeVariant } from './utils';

type ScalerVariant = ThemeVariant;

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
    },
    4: {
        layer: Stretch('scaler-src'),
    },
};

export type ScalerDirection = 'x' | 'y' | 'all' | 'none';

export interface ScalerProps extends ThemeProps<ScalerVariant> {
    direction?: ScalerDirection;
    onPointerDown?: (event: FederatedPointerEvent) => void;
}

const CURSOR_BY_DIRECTION: Record<ScalerDirection, string> = {
    x: 'ew-resize',
    y: 'ns-resize',
    all: 'nwse-resize',
    none: 'default',
};

export const Scaler: ForwardRefExoticComponent<ScalerProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScalerProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, direction = 'all', onPointerDown }, ref) => {
        const { ownCascade, config, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'scaler', variants: SCALER_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
        });

        if (!config || direction === 'none') return null;

        // TODO - layer size to fit image
        return (
            <Box
                ref={ref}
                zIndex={config.zIndex}
                layout={{
                    position: 'absolute',
                    ...config.layout,
                    ...layout,
                }}
                onPointerDown={onPointerDown}
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
