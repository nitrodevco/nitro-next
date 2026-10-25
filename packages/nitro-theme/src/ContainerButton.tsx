import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { dynamicStyleBoxProps, DynamicStyleProvider, useHostDynamicStyleEffect } from './dynamicstyle';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { expandSides, ThemeProps, ThemeVariant, ThemeWithStatesVariant, wrapTextChildren } from './utils';

export type ContainerButtonVariant = ThemeVariant | ThemeWithStatesVariant;

export interface ContainerButtonProps extends ThemeProps<ContainerButtonVariant> {
    disabled?: boolean;
    selected?: boolean;
    /** Held pressed whatever the pointer does (`useThemeVariant`'s `pressed`). */
    pressed?: boolean;
    children?: ReactNode;
}

/**
 * The Flash `container_button`: a button whose face is built from arbitrary children
 * (positioned absolutely, exactly like a `container`) rather than a centered caption. Press
 * feedback beyond the sheet's own states comes from `dynamic_style` - almost always `button`,
 * whose `#icon` rule brightens a tagged icon child on hover and sinks and darkens it when pressed
 * - applied here the way `Button` applies it: the host rule to the button itself, the child rules
 * to its tagged descendants through `DynamicStyleProvider`.
 */
export const ContainerButton: ForwardRefExoticComponent<ContainerButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContainerButtonProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, dynamicStyle, disabled, selected, pressed, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<ContainerButtonVariant>({
            cascadeKey: 'containerButton', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled, selected, pressed, interactive: !!dynamicStyle,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });
        const hostEffect = useHostDynamicStyleEffect(dynamicStyle, state);

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{ ...expandSides(config.layout), ...expandSides(layout) }}
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
                        {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                    </VariantCascadeProvider>
                </DynamicStyleProvider>
            </Box>
        );
    },
);

ContainerButton.displayName = 'ContainerButton';
