import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeProps } from './utils';
import { SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS, ScrollbarSliderBarVerticalVariant } from './variants/scrollbarSliderBarVertical';

export type ScrollbarSliderBarVerticalProps = ThemeProps<ScrollbarSliderBarVerticalVariant>;

export const ScrollbarSliderBarVertical: ForwardRefExoticComponent<ScrollbarSliderBarVerticalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderBarVerticalProps>(
    ({
        variant, defaultVariant, layout, tintColor,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'border', variants: SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS, variant, defaultVariant, tintColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        const mergedLayout = { position: 'absolute' as const, ...config.layout, ...layout };

        return (
            <Box
                ref={ref}
                cursor={state === 'pressed' ? 'grabbing' : 'grab'}
                layout={mergedLayout}
                {...handlers}
            >
                { resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                ) }
                {/* `layout` here is what lets the overlay's tile insets compute a real height
                    instead of falling back to its texture's own intrinsic size - see
                    `BackgroundLayer.tsx`'s docblock on `containerHeight`. */}
                {resolvedOverlay && (
                    <BackgroundLayer
                        layer={resolvedOverlay}
                        layout={mergedLayout}
                    />
                )}
            </Box>
        );
    },
);

ScrollbarSliderBarVertical.displayName = 'ScrollbarSliderBarVertical';
