import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { getRenderMode, THEME_URLS } from '#base/theme-core';

import { Box, BoxLayout } from './Box';
import { spriteFrameToStyle } from './dom/spriteFrameDom';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { SpriteFrame, useSpriteFrameTexture } from './utils/useSpriteFrameTexture';

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
            0: { x: 11, y: 0, width: 8, height: 13 },
            // ubuntu
            7: { x: 0, y: 0, width: 11, height: 18 },
        },
    },
    right: {
        cascadeKey: 'bubblePointerRight',
        textureKey: 'bubblepointerright-src',
        margin: { marginLeft: -2 },
        frames: {
            // default
            0: { x: 11, y: 0, width: 8, height: 13 },
            // ubuntu
            7: { x: 0, y: 0, width: 11, height: 18 },
        },
    },
    up: {
        cascadeKey: 'bubblePointerUp',
        textureKey: 'bubblepointerup-src',
        margin: { marginBottom: -3 },
        frames: {
            // default
            0: { x: 16, y: 0, width: 13, height: 9 },
            // ubuntu
            7: { x: 0, y: 0, width: 16, height: 10 },
        },
    },
    down: {
        cascadeKey: 'bubblePointerDown',
        textureKey: 'bubblepointerdown-src',
        margin: { marginTop: -3 },
        frames: {
            // default
            0: { x: 16, y: 0, width: 13, height: 9 },
            // ubuntu
            7: { x: 0, y: 0, width: 16, height: 11 },
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
        const { resolvedVariant } = useResolvedVariant(config.cascadeKey, variant, defaultVariant);
        // theme/BubblePointer.tsx defines no default tintColors for any direction/variant -
        // resolvedTint only ever comes from the caller-supplied tintColor prop, so it is used
        // (via the tintColor param above) with no per-variant fallback table needed here.
        const frame = config.frames[resolvedVariant] ?? config.frames['0'];
        const isDom = getRenderMode() === 'dom';
        const texture = useSpriteFrameTexture(isDom ? undefined : config.textureKey, isDom ? undefined : frame);

        const boxLayout: BoxLayout = { width: frame.width, height: frame.height, ...config.margin, ...layout };

        if (isDom) {
            const style = spriteFrameToStyle(config.textureKey, frame);

            if (!style) return null;

            return (
                <Box
                    ref={ref}
                    layout={boxLayout}
                >
                    <div style={style} />
                    {tintColor && (
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundColor: tintColor,
                            mixBlendMode: 'multiply',
                            WebkitMaskImage: `url(${THEME_URLS[config.textureKey]})`,
                            maskImage: `url(${THEME_URLS[config.textureKey]})`,
                            WebkitMaskPosition: style.backgroundPosition,
                            maskPosition: style.backgroundPosition,
                            WebkitMaskSize: 'none',
                            maskSize: 'none',
                        }}
                        />
                    )}
                </Box>
            );
        }

        if (!texture) return null;

        return (
            <Box
                ref={ref}
                layout={boxLayout}
            >
                <pixiSprite
                    texture={texture}
                    tint={tintColor}
                    eventMode="none"
                    layout={{}}
                />
            </Box>
        );
    },
);

BubblePointer.displayName = 'BubblePointer';
