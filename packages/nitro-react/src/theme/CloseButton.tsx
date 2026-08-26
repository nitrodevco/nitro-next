import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

type CloseButtonVariant = ThemeWithStatesVariant;

const CLOSE_BUTTON_VARIANTS: ThemeVariants<CloseButtonVariant> = {
    0: {
        states: {
            default: Stretch('closebutton-src', { x: 114, y: 0, width: 15, height: 15 }),
            hovering: Stretch('closebutton-src', { x: 129, y: 0, width: 15, height: 15 }),
            pressed: Stretch('closebutton-src', { x: 144, y: 0, width: 15, height: 15 }),
        },
    },
    1: {
        states: {
            default: Stretch('closebutton-src', { x: 159, y: 0, width: 15, height: 15 }),
            hovering: Stretch('closebutton-src', { x: 159, y: 0, width: 15, height: 15 }),
            pressed: Stretch('closebutton-src', { x: 159, y: 0, width: 15, height: 15 }),
        },
    },
    2: {
        states: {
            default: Stretch('closebutton-src', { x: 174, y: 0, width: 15, height: 15 }),
            hovering: Stretch('closebutton-src', { x: 174, y: 0, width: 15, height: 15 }),
            pressed: Stretch('closebutton-src', { x: 174, y: 0, width: 15, height: 15 }),
        },
    },
    3: {
        states: {
            default: Stretch('closebutton-src', { x: 0, y: 0, width: 19, height: 20 }),
            hovering: Stretch('closebutton-src', { x: 19, y: 0, width: 19, height: 20 }),
            pressed: Stretch('closebutton-src', { x: 38, y: 0, width: 19, height: 20 }),
        },
    },
    4: {
        states: {
            default: Stretch('closebutton-src', { x: 57, y: 0, width: 19, height: 20 }),
            hovering: Stretch('closebutton-src', { x: 76, y: 0, width: 19, height: 20 }),
            pressed: Stretch('closebutton-src', { x: 95, y: 0, width: 19, height: 20 }),
        },
    },
    // Separate, smaller texture - the whole texture is the frame, no hover/press states.
    100: {
        states: {
            default: Stretch('closebutton-100-src'),
            hovering: Stretch('closebutton-100-src'),
            pressed: Stretch('closebutton-100-src'),
        },
    },
};

export type CloseButtonProps = ThemeProps<CloseButtonVariant>;

export const CloseButton: ForwardRefExoticComponent<CloseButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, CloseButtonProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'closeButton', variants: CLOSE_BUTTON_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, stopsPropagation: false, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                layout={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...config.layout,
                    ...layout,
                }}
                {...handlers}
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

CloseButton.displayName = 'CloseButton';
