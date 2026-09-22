import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from '../Box';
import { VariantCascadeProvider } from '../cascade';
import { useThemeVariant } from '../hooks';
import { BackgroundLayer, NineSlice } from '../layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './ThemeVariant';
import { wrapTextChildren } from './wrapTextChildren';

export type ButtonGroupVariant = ThemeWithStatesVariant;

/**
 * One segment of a `habbo_skin_button_group_<left|center|right>[_black]` skin, cut by
 * `extract-skin-assets.ts` at the layout's natural 22px height. The skins map `pressed` onto the
 * `selected` template, so a held segment draws the selected file and there is no pressed one. `left` is the width of the layout's left column - 3 on the rounded
 * left segment, 1 on the centre and right ones, which butt against their neighbour. The box and
 * caption come from the row's `window_layout`, spread beside it (`windowLayout`).
 */
export const buttonGroupVariant = (prefix: string, left: number): ButtonGroupVariant => ({
    states: {
        default: NineSlice(`${prefix}-default-src`, left, 3, 3, 3),
        hovering: NineSlice(`${prefix}-hovering-src`, left, 3, 3, 3),
        pressed: NineSlice(`${prefix}-selected-src`, left, 3, 3, 3),
        selected: NineSlice(`${prefix}-selected-src`, left, 3, 3, 3),
        disabled: NineSlice(`${prefix}-disabled-src`, left, 3, 3, 3),
    },
});

export interface ButtonGroupComponentProps extends ThemeProps<ButtonGroupVariant> {
    selected?: boolean;
    disabled?: boolean;
    children?: ReactNode;
}

export const createButtonGroupComponent = (
    displayName: string,
    cascadeKey: string,
    variants: ThemeVariants<ButtonGroupVariant>,
): ForwardRefExoticComponent<ButtonGroupComponentProps & RefAttributes<PixiContainer>> => {
    const Component = forwardRef<PixiContainer, ButtonGroupComponentProps>(
        ({
            variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, disabled, selected, children,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        }, ref) => {
            const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
                cascadeKey, variants, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled, selected,
                onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
            });

            return (
                <Box
                    ref={ref}
                    layout={{
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

    Component.displayName = displayName;

    return Component;
};
