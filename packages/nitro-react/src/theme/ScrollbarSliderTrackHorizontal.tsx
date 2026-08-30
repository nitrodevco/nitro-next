import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice, Stretch } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

export type ScrollbarSliderTrackHorizontalVariant = ThemeWithStatesVariant;

const SCROLLBAR_SLIDER_TRACK_HORIZONTAL_VARIANTS: ThemeVariants<ScrollbarSliderTrackHorizontalVariant> = {
    0: {
        states: {
            default: Stretch('scrollbarslidertrackhorizontal-0-default-src'),
        },
        layout: {
            minWidth: 1,
            minHeight: 17,
        },
    },
    1: {
        states: {
            default: Stretch('scrollbarslidertrackhorizontal-1-default-src'),
        },
        layout: {
            minWidth: 1,
            minHeight: 17,
        },
    },
    3: {
        states: {
            default: Stretch('scrollbarslidertrackhorizontal-3-default-src'),
            disabled: Stretch('scrollbarslidertrackhorizontal-3-disabled-src'),
        },
        layout: {
            minWidth: 2,
            minHeight: 17,
        },
    },
    100: {
        states: {
            default: NineSlice('scrollbarslidertrackhorizontal-100-default-src', 2, 0, 2, 0),
        },
    },
    200: {
        states: {
            default: NineSlice('scrollbarslidertrackhorizontal-200-default-src', 2, 0, 2, 0),
        },
    },
};

export interface ScrollbarSliderTrackHorizontalProps extends ThemeProps<ScrollbarSliderTrackHorizontalVariant> {
    disabled?: boolean;
    children?: ReactNode;
}

/** Pixi port of theme/ScrollbarSliderTrackHorizontal.tsx - the clickable track behind the thumb. */
export const ScrollbarSliderTrackHorizontal: ForwardRefExoticComponent<ScrollbarSliderTrackHorizontalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderTrackHorizontalProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, disabled, children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'scrollbarSliderTrackHorizontal', variants: SCROLLBAR_SLIDER_TRACK_HORIZONTAL_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                layout={{ flex: 1, ...config.layout, ...layout }}
                {...handlers}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

ScrollbarSliderTrackHorizontal.displayName = 'ScrollbarSliderTrackHorizontal';
