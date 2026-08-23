import './pixiElements';

import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme-core';

import { Box } from '../Box';
import { BackgroundLayer } from '../layer';
import { Text } from '../Text';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from '../variant';
import { useThemeVariant } from './useThemeVariant';
import { wrapTextChildren } from './wrapTextChildren';

export type ButtonGroupVariant = ThemeWithStatesVariant;

export interface ButtonGroupComponentProps extends ThemeProps<ButtonGroupVariant> {
    selected?: boolean;
    disabled?: boolean;
    onPress?: () => void;
    children?: ReactNode;
}

export const createButtonGroupComponent = (
    displayName: string,
    cascadeKey: string,
    variants: ThemeVariants<ButtonGroupVariant>,
): ForwardRefExoticComponent<ButtonGroupComponentProps & RefAttributes<PixiContainer>> => {
    const Component = forwardRef<PixiContainer, ButtonGroupComponentProps>(
        ({ variant, defaultVariant, tintColor, selected, disabled, layout, onPress, children }, ref) => {
            const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
                cascadeKey, variants, variant, defaultVariant, tintColor, disabled, selected,
            });

            return (
                <Box
                    ref={ref}
                    layout={{
                        ...config.layout,
                        ...layout,
                    }}
                    {...handlers}
                    onPointerTap={disabled ? undefined : onPress}
                >
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                    {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                    <VariantCascadeProvider map={ownCascade}>
                        {typeof children === 'string'
                            ? (
                                    <Text
                                        text={children}
                                        textStyle={config.textStyle}
                                        textOptions={{ fill: config.textColor }}
                                    />
                                )
                            : wrapTextChildren(children)}
                    </VariantCascadeProvider>
                </Box>
            );
        },
    );

    Component.displayName = displayName;

    return Component;
};
