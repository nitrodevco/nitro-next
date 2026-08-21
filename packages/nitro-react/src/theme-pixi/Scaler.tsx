import './utils/pixiElements';

import type { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { useCascadedVariant } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { usePixiTexture } from './utils/usePixiTexture';

/** Only the variants used by a migrated view are ported here - see theme/Scaler.tsx. */
const SCALER_TEXTURE_KEYS: Partial<Record<string, string>> = {
    '0': 'scaler-0-default-src',
    '3': 'scaler-src',
};

export type ScalerDirection = 'x' | 'y' | 'all' | 'none';

export interface ScalerProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
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
    ({ variant, defaultVariant, layout, direction = 'all', onPointerDown }, ref) => {
        const cascadedVariant = useCascadedVariant('scaler');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const texture = usePixiTexture(SCALER_TEXTURE_KEYS[resolvedVariant] ?? SCALER_TEXTURE_KEYS['0']);

        if (!texture || direction === 'none') return null;

        return (
            <Box
                ref={ref}
                layout={{ position: 'absolute', right: 0, bottom: 0, width: texture.width, height: texture.height, ...layout }}
            >
                <pixiSprite
                    texture={texture}
                    width={texture.width}
                    height={texture.height}
                    eventMode="static"
                    cursor={CURSOR_BY_DIRECTION[direction]}
                    layout={{}}
                    onPointerDown={onPointerDown}
                />
            </Box>
        );
    }
);

Scaler.displayName = 'Scaler';
