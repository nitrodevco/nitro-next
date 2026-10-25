import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { dynamicStyleBoxProps, DynamicStyleProvider, useHostDynamicStyleEffect } from './dynamicstyle';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ButtonVariant, expandSides, ThemeProps, wrapTextChildren } from './utils';

/** `ButtonController.CAPTION_BLEND_CHANGE`: `WE_DISABLED` takes it off the caption's blend, `WE_ENABLED` gives it back. */
const CAPTION_BLEND_CHANGE = 0.5;

export interface ButtonProps extends ThemeProps<ButtonVariant> {
    disabled?: boolean;
    selected?: boolean;
    /** Held pressed whatever the pointer does (`useThemeVariant`'s `pressed`). */
    pressed?: boolean;
    children?: ReactNode;
}

/**
 * Flash's `ButtonController` (`button`, and `button_thick` - see `ButtonThick`): the state's skin
 * behind a caption centred in a row (half faded while disabled), the window's `dynamic_style` applied to the button and its
 * tagged children. Each window type is this component bound to its own cascade key.
 */
export const createButton = (displayName: string, cascadeKey: string): ForwardRefExoticComponent<ButtonProps & RefAttributes<PixiContainer>> => {
    const Component = forwardRef<PixiContainer, ButtonProps>(
        ({
            variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, dynamicStyle, disabled, selected, pressed, children,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        }, ref) => {
            const { ownCascade, config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<ButtonVariant>({
                cascadeKey, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled, selected, pressed, interactive: !!dynamicStyle,
                onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
            });
            // A few layouts put a `dynamic_style` on a button too: its own rule (only the disabled fade) and its tagged children's.
            const hostEffect = useHostDynamicStyleEffect(dynamicStyle, state);

            return (
                <Box
                    ref={ref}
                    visible={visible}
                    layout={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...expandSides(config.layout),
                        ...expandSides(layout),
                    }}
                    {...dynamicStyleBoxProps(hostEffect)}
                    {...handlers}
                >
                    {resolvedLayer && (
                        <BackgroundLayer
                            layer={resolvedLayer}
                            tintColor={resolvedTint}
                        />
                    )}
                    {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                    <DynamicStyleProvider
                        name={dynamicStyle}
                        state={state}
                    >
                        <VariantCascadeProvider map={ownCascade}>
                            {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor, alpha: (state === 'disabled') ? 1 - CAPTION_BLEND_CHANGE : undefined })}
                        </VariantCascadeProvider>
                    </DynamicStyleProvider>
                </Box>
            );
        },
    );

    Component.displayName = displayName;

    return Component;
};

/** `button`: its variants are the theme's `button`. */
export const Button = createButton('Button', 'button');
