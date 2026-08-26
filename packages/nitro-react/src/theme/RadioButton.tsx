import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

type RadioButtonVariant = ThemeWithStatesVariant;

const RADIO_BUTTON_VARIANTS: ThemeVariants<RadioButtonVariant> = {
    0: {
        states: {
            default: Stretch('radiobutton-src', { x: 0, y: 0, width: 16, height: 16 }),
            selected: Stretch('radiobutton-src', { x: 16, y: 0, width: 16, height: 16 }),
        },
        layout: {
            width: 16,
            height: 16,
            padding: 0,
        },
    },
    1: {
        states: {
            default: Stretch('radiobutton-src', { x: 32, y: 0, width: 16, height: 16 }),
            selected: Stretch('radiobutton-src', { x: 48, y: 0, width: 16, height: 16 }),
        },
        layout: {
            width: 16,
            height: 16,
            padding: 0,
        },
    },
    2: {
        states: {
            default: Stretch('radiobutton-src', { x: 64, y: 0, width: 16, height: 16 }),
            selected: Stretch('radiobutton-src', { x: 16, y: 0, width: 16, height: 16 }),
        },
        layout: {
            width: 16,
            height: 16,
            padding: 0,
        },
    },
    100: {
        states: {
            default: Stretch('radiobutton-100-default-src'),
            selected: Stretch('radiobutton-100-selected-src'),
        },
        layout: {
            width: 11,
            height: 14,
            paddingLeft: 14,
        },
        textStyle: 'text-style-il-regular',
        textColor: '#000000',
    },
};

export interface RadioButtonProps extends ThemeProps<RadioButtonVariant> {
    disabled?: boolean;
    selected?: boolean;
    children?: ReactNode;
}

export const RadioButton: ForwardRefExoticComponent<RadioButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, RadioButtonProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, disabled, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'radioButton', variants: RADIO_BUTTON_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
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
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

RadioButton.displayName = 'RadioButton';
