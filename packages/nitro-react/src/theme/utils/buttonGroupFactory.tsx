import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from '../Box';
import { VariantCascadeProvider } from '../cascade';
import { useThemeVariant } from '../hooks';
import { BackgroundLayer } from '../layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './ThemeVariant';
import { wrapTextChildren } from './wrapTextChildren';

export type ButtonGroupVariant = ThemeWithStatesVariant;

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
            variant, defaultVariant, layout, tintColor, textStyle, textColor, disabled, selected, children,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        }, ref) => {
            const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
                cascadeKey, variants, variant, defaultVariant, tintColor, textStyle, textColor, disabled, selected,
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
