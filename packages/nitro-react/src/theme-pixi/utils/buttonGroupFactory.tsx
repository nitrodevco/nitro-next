import './pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from '../Box';
import { BackgroundLayer, BackgroundLayerConfig } from '../layer';
import { Text } from '../Text';
import { type TextStyleKey } from './textStyles';
import { type InteractionStates, resolveByState, useInteractionState } from './useInteractionState';
import { useResolvedVariant } from './useResolvedVariant';
import { wrapTextChildren } from './wrapTextChildren';

export interface ButtonGroupVariant {
    states: InteractionStates<BackgroundLayerConfig>;
    overlay?: InteractionStates<BackgroundLayerConfig>;
    tintColor?: string;
    layout?: BoxLayout;
    textStyleKey?: TextStyleKey;
    color?: string;
}

export interface ButtonGroupComponentProps {
    variant?: string;
    defaultVariant?: string;
    selected?: boolean;
    disabled?: boolean;
    layout?: BoxLayout;
    tintColor?: string;
    onPress?: () => void;
    children?: ReactNode;
}

export const createButtonGroupComponent = (
    displayName: string,
    cascadeKey: string,
    variants: Record<string, ButtonGroupVariant>
): ForwardRefExoticComponent<ButtonGroupComponentProps & RefAttributes<PixiContainer>> => {
    const Component = forwardRef<PixiContainer, ButtonGroupComponentProps>(
        ({ variant, defaultVariant, tintColor, selected, disabled, layout, onPress, children }, ref) => {
            const { resolvedVariant, ownCascade } = useResolvedVariant(cascadeKey, variant, defaultVariant);
            const config = variants[resolvedVariant] ?? variants['0'];
            const { state, handlers } = useInteractionState(disabled);
            const resolvedLayer = resolveByState(config.states, state, selected);
            const resolvedOverlay = config.overlay && resolveByState(config.overlay, state);
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
                            ? <Text text={children} textStyle={config.textStyleKey} textOptions={{ fill: config.color }} />
                            : wrapTextChildren(children)}
                    </VariantCascadeProvider>
                </Box>
            );
        }
    );

    Component.displayName = displayName;

    return Component;
};
