import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Composite, CompositePiece, Stretch } from './layer';
import { expandSides, ThemeProps, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

export type RadioButtonVariant = ThemeWithStatesVariant;

const RADIO_BUTTON_VARIANTS: ThemeVariants<RadioButtonVariant> = {
    0: {
        states: {
            default: Stretch('radiobutton-0-default-src'),
            selected: Stretch('radiobutton-0-selected-src'),
        },
        layout: {
            width: 16,
            height: 16,
            padding: 0,
        },
    },
    1: {
        states: {
            default: Stretch('radiobutton-1-default-src'),
            selected: Stretch('radiobutton-1-selected-src'),
        },
        layout: {
            width: 16,
            height: 16,
            padding: 0,
        },
    },
    2: {
        states: {
            default: Stretch('radiobutton-2-default-src'),
            selected: Stretch('radiobutton-2-selected-src'),
        },
        layout: {
            width: 16,
            height: 16,
            padding: 0,
        },
    },
    /*
     * `illumina_light_skin_radio_button`: one 11x12 bitmap per state, placed at (0, 2) of an
     * 11x14 layout with `scale horizontal="fixed" vertical="fixed"`. The wired styles give the
     * control a 12x16 box (`radiobutton_view` in `wired_style_illumina_xml`), so stretching the
     * art to fill it - as the 16x16 habbo styles can, their art being the box's size - squashed
     * the dot into a lopsided blob. Pinned top left at its own size instead, the way Flash
     * copies a `fixed` region.
     */
    100: {
        states: {
            default: Composite([ CompositePiece('radiobutton-100-default-src', 0, 0, undefined, undefined, 11, 14) ]),
            selected: Composite([ CompositePiece('radiobutton-100-selected-src', 0, 0, undefined, undefined, 11, 14) ]),
        },
        layout: {
            width: 11,
            height: 14,
            paddingLeft: 14,
        },
        textStyle: 'il_regular',
        textColor: '#000000',
    },
};

export interface RadioButtonProps extends ThemeProps<RadioButtonVariant> {
    disabled?: boolean;
    selected?: boolean;
    /**
     * The window's `blend` (`WindowController.blend`): the opacity its graphic context is drawn
     * with, clamped to 0..1 as the setter does, covering the art and the label alike.
     */
    alpha?: number;
    children?: ReactNode;
}

export const RadioButton: ForwardRefExoticComponent<RadioButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, RadioButtonProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, disabled, selected, alpha, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'radioButton', variants: RADIO_BUTTON_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        // The skin's layout entities are `fixed`: `BitmapSkinRenderer.draw` copies them at their own
        // size from the window's top-left, however large the window is - never stretched over it.
        const skinLayout: BoxLayout = { position: 'absolute', left: 0, top: 0, width: config.layout?.width, height: config.layout?.height };

        return (
            <Box
                ref={ref}
                visible={visible}
                alpha={(alpha === undefined) ? undefined : Math.min(1, Math.max(0, alpha))}
                layout={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...expandSides(config.layout),
                    ...expandSides(layout),
                }}
                {...handlers}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                        layout={skinLayout}
                    />
                )}
                {resolvedOverlay && (
                    <BackgroundLayer
                        layer={resolvedOverlay}
                        layout={skinLayout}
                    />
                )}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

RadioButton.displayName = 'RadioButton';
