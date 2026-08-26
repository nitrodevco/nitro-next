import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from '../Box';
import { VariantCascadeProvider } from '../cascade';
import { useThemeVariant } from '../hooks';
import { BackgroundLayer } from '../layer';
import { ThemeText } from '../ThemeText';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './ThemeVariant';
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
                cascadeKey, variants, variant, defaultVariant, tintColor, disabled, selected, onPointerTap: onPress,
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
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                    {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                    <VariantCascadeProvider map={ownCascade}>
                        {typeof children === 'string'
                            ? (
                                    <ThemeText
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
