import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { useCascadedVariant } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { type SpriteFrame, useSpriteFrameTexture } from './utils/useSpriteFrameTexture';

type Direction = 'left' | 'right' | 'up' | 'down';

interface DirectionConfig {
    cascadeKey: string;
    textureKey: string;
    /** theme/BubblePointer.tsx's small negative margin (e.g. `-mr-0.5` for `left`) pulling the
     *  pointer flush against the Bubble body it's stacked next to. */
    margin: Pick<BoxLayout, 'marginLeft' | 'marginRight' | 'marginTop' | 'marginBottom'>;
    /** Each frame's width/height doubles as the DOM variant's `min-w`/`min-h` - the CSS
     *  `background-position` crop rect and the box's own min size always agree exactly. */
    frames: Record<string, SpriteFrame>;
}

const DIRECTION_CONFIG: Record<Direction, DirectionConfig> = {
    left: {
        cascadeKey: 'bubblePointerLeft',
        textureKey: 'bubblepointerleft-src',
        margin: { marginRight: -2 },
        frames: {
            // default
            '0': { x: 11, y: 0, width: 8, height: 13 },
            // ubuntu
            '7': { x: 0, y: 0, width: 11, height: 18 },
        },
    },
    right: {
        cascadeKey: 'bubblePointerRight',
        textureKey: 'bubblepointerright-src',
        margin: { marginLeft: -2 },
        frames: {
            // default
            '0': { x: 11, y: 0, width: 8, height: 13 },
            // ubuntu
            '7': { x: 0, y: 0, width: 11, height: 18 },
        },
    },
    up: {
        cascadeKey: 'bubblePointerUp',
        textureKey: 'bubblepointerup-src',
        margin: { marginBottom: -3 },
        frames: {
            // default
            '0': { x: 16, y: 0, width: 13, height: 9 },
            // ubuntu
            '7': { x: 0, y: 0, width: 16, height: 10 },
        },
    },
    down: {
        cascadeKey: 'bubblePointerDown',
        textureKey: 'bubblepointerdown-src',
        margin: { marginTop: -3 },
        frames: {
            // default
            '0': { x: 16, y: 0, width: 13, height: 9 },
            // ubuntu
            '7': { x: 0, y: 0, width: 16, height: 11 },
        },
    },
};

export interface BubblePointerProps {
    direction: Direction;
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    layout?: BoxLayout;
}

export const BubblePointer: ForwardRefExoticComponent<BubblePointerProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BubblePointerProps>(
    ({ direction, variant, defaultVariant, tintColor, layout }, ref) => {
        const config = DIRECTION_CONFIG[direction];
        const cascadedVariant = useCascadedVariant(config.cascadeKey);
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        // theme/BubblePointer.tsx defines no default tintColors for any direction/variant -
        // resolvedTint only ever comes from the caller-supplied tintColor prop, so it is used
        // (via the tintColor param above) with no per-variant fallback table needed here.
        const frame = config.frames[resolvedVariant] ?? config.frames['0'];
        const texture = useSpriteFrameTexture(config.textureKey, frame);

        if (!texture) return null;

        return (
            <Box
                ref={ref}
                layout={{
                    width: frame.width,
                    height: frame.height,
                    ...config.margin,
                    ...layout,
                }}
            >
                <pixiSprite texture={texture} tint={tintColor} eventMode="none" layout={{}} />
            </Box>
        );
    }
);

BubblePointer.displayName = 'BubblePointer';
