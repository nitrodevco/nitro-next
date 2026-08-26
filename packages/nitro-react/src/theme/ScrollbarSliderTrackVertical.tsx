import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice, Stretch } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

type ScrollbarSliderTrackVerticalVariant = ThemeWithStatesVariant;

const SCROLLBAR_SLIDER_TRACK_VERTICAL_VARIANTS: ThemeVariants<ScrollbarSliderTrackVerticalVariant> = {
    0: {
        states: {
            default: Stretch('scrollbarslidertrackvertical-0-default-src'),
        },
        layout: {
            minWidth: 17, minHeight: 1,
        },
    },
    1: {
        states: {
            default: Stretch('scrollbarslidertrackvertical-1-default-src'),
        },
        layout: {
            minWidth: 17, minHeight: 1,
        },
    },
    3: {
        states: {
            default: Stretch('scrollbarslidertrackvertical-3-default-src'),
            disabled: Stretch('scrollbarslidertrackvertical-3-disabled-src'),
        },
        layout: {
            minWidth: 17, minHeight: 2,
        },
    },
    100: {
        states: {
            default: NineSlice('scrollbarslidertrackhorizontal-100-default-src', 0, 2, 0, 2),
        },
        layout: {
            minWidth: 10, minHeight: 1,
        },
    },
    200: {
        states: {
            default: NineSlice('scrollbarslidertrackhorizontal-200-default-src', 0, 3, 0, 3),
        },
        layout: {
            minWidth: 8, minHeight: 1,
        },
    },
};

export interface ScrollbarSliderTrackVerticalProps extends ThemeProps<ScrollbarSliderTrackVerticalVariant> {
    disabled?: boolean;
    onPointerDown?: (event: FederatedPointerEvent) => void;
    children?: ReactNode;
}

export const ScrollbarSliderTrackVertical: ForwardRefExoticComponent<ScrollbarSliderTrackVerticalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderTrackVerticalProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, disabled, onPointerDown, children }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'scrollbarSliderTrackVertical', variants: SCROLLBAR_SLIDER_TRACK_VERTICAL_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled, onPointerDown,
        });

        return (
            <Box
                ref={ref}
                cursor={disabled ? undefined : 'pointer'}
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

ScrollbarSliderTrackVertical.displayName = 'ScrollbarSliderTrackVertical';
