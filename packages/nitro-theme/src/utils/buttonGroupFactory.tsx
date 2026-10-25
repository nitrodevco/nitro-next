import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from '../Box';
import { VariantCascadeProvider } from '../cascade';
import { useThemeVariant } from '../hooks';
import { BackgroundLayer } from '../layer';
import { expandSides } from './expandSides';
import { ThemeProps, ThemeWithStatesVariant } from './ThemeVariant';
import { wrapTextChildren } from './wrapTextChildren';

export type ButtonGroupVariant = ThemeWithStatesVariant;

export interface ButtonGroupComponentProps extends ThemeProps<ButtonGroupVariant> {
    selected?: boolean;
    disabled?: boolean;
    children?: ReactNode;
}

/**
 * Flash's `SelectableButtonController` (`button_group_left`, `_center`, `_right` - a `ButtonController`
 * that stays selected): the state's skin with its caption centred over it, as its window layout's
 * `_BTN_TEXT` label is (`relative_horizontal_scale_center`, `relative_vertical_scale_center`). Each of
 * the three is this component bound to its own cascade key.
 */
export const createButtonGroupComponent = (
    displayName: string,
    cascadeKey: string,
): ForwardRefExoticComponent<ButtonGroupComponentProps & RefAttributes<PixiContainer>> => {
    const Component = forwardRef<PixiContainer, ButtonGroupComponentProps>(
        ({
            variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, disabled, selected, children,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        }, ref) => {
            const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<ButtonGroupVariant>({
                cascadeKey, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled, selected,
                onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
            });

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

    Component.displayName = displayName;

    return Component;
};
