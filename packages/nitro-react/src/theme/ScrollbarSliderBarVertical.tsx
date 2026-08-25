import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice, Tiled } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

type ScrollbarSliderBarVerticalVariant = ThemeWithStatesVariant;

const SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS: ThemeVariants<ScrollbarSliderBarVerticalVariant> = {
    0: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-0-default-src', 0, 2, 0, 2),
            hovering: NineSlice('scrollbarsliderbarvertical-0-default-src', 0, 2, 0, 2),
            pressed: NineSlice('scrollbarsliderbarvertical-0-pressed-src', 0, 2, 0, 2),
        },
        overlays: {
            default: Tiled('scrollbarsliderbarvertical-0-default-grd-src', 5, 4, 4, 7),
            pressed: Tiled('scrollbarsliderbarvertical-0-pressed-grd-src', 5, 4, 4, 7),
        },
    },
    1: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-1-default-src', 0, 2, 0, 2),
            hovering: NineSlice('scrollbarsliderbarvertical-1-default-src', 0, 2, 0, 2),
            pressed: NineSlice('scrollbarsliderbarvertical-1-default-src', 0, 2, 0, 2),
        },
        overlays: {
            default: Tiled('scrollbarsliderbarvertical-1-default-grd-src', 5, 4, 4, 7),
            pressed: Tiled('scrollbarsliderbarvertical-1-pressed-grd-src', 5, 4, 4, 7),
        },
    },
    3: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-3-default-src', 0, 5, 0, 5, undefined, 'y'),
            hovering: NineSlice('scrollbarsliderbarvertical-3-hovering-src', 0, 5, 0, 5, undefined, 'y'),
            pressed: NineSlice('scrollbarsliderbarvertical-3-pressed-src', 0, 5, 0, 5, undefined, 'y'),
        },
    },
    100: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-100-default-src', 0, 4, 0, 4),
            hovering: NineSlice('scrollbarsliderbarvertical-100-default-src', 0, 4, 0, 4),
            pressed: NineSlice('scrollbarsliderbarvertical-100-default-src', 0, 4, 0, 4),
        },
    },
    200: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-200-default-src', 0, 4, 0, 4),
            hovering: NineSlice('scrollbarsliderbarvertical-200-default-src', 0, 4, 0, 4),
            pressed: NineSlice('scrollbarsliderbarvertical-200-default-src', 0, 4, 0, 4),
        },
    },
};

export interface ScrollbarSliderBarVerticalProps extends ThemeProps<ScrollbarSliderBarVerticalVariant> {
    onPointerDown?: (event: FederatedPointerEvent) => void;
}

export const ScrollbarSliderBarVertical: ForwardRefExoticComponent<ScrollbarSliderBarVerticalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderBarVerticalProps>(
    ({ variant, defaultVariant, layout, tintColor, onPointerDown }, ref) => {
        const { config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'border', variants: SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS, variant, defaultVariant, tintColor,
        });

        const handlePointerDown = (event: FederatedPointerEvent) => {
            handlers.onPointerDown?.();
            onPointerDown?.(event);
        };

        return (
            <Box
                ref={ref}
                eventMode="static"
                cursor={state === 'pressed' ? 'grabbing' : 'grab'}
                layout={{ position: 'absolute', ...config.layout, ...layout }}
                onPointerOver={handlers.onPointerOver}
                onPointerOut={handlers.onPointerOut}
                onPointerDown={handlePointerDown}
                onPointerUp={handlers.onPointerUp}
                onPointerUpOutside={handlers.onPointerUpOutside}
            >
                { resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                ) }
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
            </Box>
        );
    },
);

ScrollbarSliderBarVertical.displayName = 'ScrollbarSliderBarVertical';
