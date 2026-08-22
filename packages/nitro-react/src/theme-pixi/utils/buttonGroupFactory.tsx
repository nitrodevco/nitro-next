import './pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box } from '../Box';
import { BackgroundLayer } from '../layer';
import { Text } from '../Text';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from '../variant';
import { resolveByState, useInteractionState } from './useInteractionState';
import { useResolvedVariant } from './useResolvedVariant';
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
    variants: ThemeVariants<ButtonGroupVariant>
): ForwardRefExoticComponent<ButtonGroupComponentProps & RefAttributes<PixiContainer>> => {
    const Component = forwardRef<PixiContainer, ButtonGroupComponentProps>(
        ({ variant, defaultVariant, tintColor, selected, disabled, layout, onPress, children }, ref) => {
            const { resolvedVariant, ownCascade } = useResolvedVariant(cascadeKey, variant, defaultVariant);
            const config = variants[resolvedVariant] ?? variants['0'];
            const { state, handlers } = useInteractionState(disabled);
            const resolvedLayer = config.states && resolveByState(config.states, state, selected);
            const resolvedOverlay = config.overlays && resolveByState(config.overlays, state);
            const resolvedTint = tintColor || config.tintColor;

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
                    <BackgroundLayer layer={resolvedLayer} tintColor={resolvedTint} />
                    {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                    <VariantCascadeProvider map={ownCascade}>
                        {typeof children === 'string'
                            ? <Text text={children} textStyle={config.textStyleKey} textOptions={{ fill: config.textColor }} />
                            : wrapTextChildren(children)}
                    </VariantCascadeProvider>
                </Box>
            );
        }
    );

    Component.displayName = displayName;

    return Component;
};
