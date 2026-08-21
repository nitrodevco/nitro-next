import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { Box, type BoxLayout } from './Box';
import { SpriteLayer } from './utils/Layer';
import { useResolvedVariant } from './utils/useResolvedVariant';

interface FramePointerDownVariant {
    textureKey: string;
    width: number;
    height: number;
}

/** Full port of theme/FramePointerDown.tsx's single-variant table - DOM defines only '7'
 *  ("bubble"), no other variants, a fixed-size sprite with no interaction states, no tint,
 *  no overlay. */
const FRAME_POINTER_DOWN_VARIANTS: Record<string, FramePointerDownVariant> = {
    '7': { textureKey: 'framepointerdown-src', width: 16, height: 12 },
};

export interface FramePointerDownProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
}

export const FramePointerDown: ForwardRefExoticComponent<FramePointerDownProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, FramePointerDownProps>(
    ({ variant, defaultVariant, layout }, ref) => {
        const { resolvedVariant } = useResolvedVariant('framePointerDown', variant, defaultVariant, '7');
        const config = FRAME_POINTER_DOWN_VARIANTS[resolvedVariant] ?? FRAME_POINTER_DOWN_VARIANTS['7'];

        return (
            <Box ref={ref} layout={{ width: config.width, height: config.height, ...layout }}>
                <SpriteLayer textureKey={config.textureKey} />
            </Box>
        );
    }
);

FramePointerDown.displayName = 'FramePointerDown';
