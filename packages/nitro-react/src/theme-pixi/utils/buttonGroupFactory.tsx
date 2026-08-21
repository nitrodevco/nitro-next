import './pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { useCascadedVariant, VARIANT_CASCADE_CONFIG, VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from '../Box';
import { NineSliceLayer } from './Layer';
import { getPixiTextStyle, type TextStyleKey } from './textStyles';
import { type InteractionState, useInteractionState } from './useInteractionState';
import { wrapTextChildren } from './wrapTextChildren';

/**
 * Shared implementation behind ButtonGroupLeft/Center/Right. theme/ButtonGroupLeft.tsx,
 * theme/ButtonGroupCenter.tsx and theme/ButtonGroupRight.tsx are otherwise-identical DOM
 * components that differ only in their asset-key prefix and border-image-slice geometry, so
 * their Pixi ports share this one render implementation - each component file supplies just
 * its own `cascadeKey` and variant table. Unlike Border/Button/ContainerButton, none of these
 * three DOM components carry a `tintColor` prop or any tintable-vars table, so this factory
 * has no tint handling at all (not an omission - there is nothing to port).
 */

export interface ButtonGroupLayerState {
    textureKey: string;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
}

/** `aria-selected:` and `active:` swap to the exact same art/slice in every DOM variant of
 *  these three components, so both collapse to this one `selected` state here. */
export interface ButtonGroupStates {
    default: ButtonGroupLayerState;
    hovering: ButtonGroupLayerState;
    selected: ButtonGroupLayerState;
    disabled: ButtonGroupLayerState;
}

export interface ButtonGroupVariant {
    states: ButtonGroupStates;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    minWidth: number;
    minHeight: number;
    textStyleKey: TextStyleKey;
    color: string;
}

export const layerState = (textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number): ButtonGroupLayerState => (
    { textureKey, leftWidth, topHeight, rightWidth, bottomHeight }
);

const resolveLayerState = (states: ButtonGroupStates, interactionState: InteractionState, selected: boolean | undefined): ButtonGroupLayerState => {
    if (interactionState === 'disabled') return states.disabled;
    if (selected || interactionState === 'pressed') return states.selected;
    if (interactionState === 'hovering') return states.hovering;

    return states.default;
};

export interface ButtonGroupComponentProps {
    variant?: string;
    defaultVariant?: string;
    /** Pixi equivalent of the DOM `aria-selected` state - renders the same art as an
     *  in-progress pointer press (see `resolveLayerState` above). */
    selected?: boolean;
    /** Not present as a named prop on the DOM components (they just forward arbitrary
     *  `aria-disabled`/HTML props), but needed here to ever reach their `aria-disabled:`
     *  art swap, which would otherwise be unreachable dead configuration. */
    disabled?: boolean;
    layout?: BoxLayout;
    onPress?: () => void;
    children?: ReactNode;
}

/**
 * theme/ButtonGroupLeft.tsx & co. build their `cva` base class from an empty string - unlike
 * Button/ButtonThick/ContainerButton they carry no `flex items-center justify-center` classes
 * at all, so (matching Border.tsx, not Button.tsx) this deliberately does NOT add flex
 * centering to the Box layout: a plain DOM block div lays out text top-left inset by padding,
 * and this reproduces that rather than the centered layout the other button-family ports use.
 */
export const createButtonGroupComponent = (
    displayName: string,
    cascadeKey: string,
    variants: Record<string, ButtonGroupVariant>
): ForwardRefExoticComponent<ButtonGroupComponentProps & RefAttributes<PixiContainer>> => {
    const Component = forwardRef<PixiContainer, ButtonGroupComponentProps>(
        ({ variant, defaultVariant, selected, disabled, layout, onPress, children }, ref) => {
            const cascadedVariant = useCascadedVariant(cascadeKey);
            const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
            const ownCascade = VARIANT_CASCADE_CONFIG[cascadeKey]?.[resolvedVariant];
            const config = variants[resolvedVariant] ?? variants['0'];
            const { state, handlers } = useInteractionState(disabled);
            const resolvedLayer = resolveLayerState(config.states, state, selected);

            return (
                <Box
                    ref={ref}
                    layout={{
                        paddingLeft: config.paddingLeft,
                        paddingTop: config.paddingTop,
                        paddingRight: config.paddingRight,
                        paddingBottom: config.paddingBottom,
                        minWidth: config.minWidth,
                        minHeight: config.minHeight,
                        ...layout,
                    }}
                    {...handlers}
                    onPointerTap={disabled ? undefined : onPress}
                >
                    <NineSliceLayer
                        textureKey={resolvedLayer.textureKey}
                        leftWidth={resolvedLayer.leftWidth}
                        topHeight={resolvedLayer.topHeight}
                        rightWidth={resolvedLayer.rightWidth}
                        bottomHeight={resolvedLayer.bottomHeight}
                    />
                    <VariantCascadeProvider map={ownCascade}>
                        {typeof children === 'string'
                            ? <pixiText layout={{}} text={children} style={getPixiTextStyle(config.textStyleKey, { fill: config.color })} />
                            : wrapTextChildren(children)}
                    </VariantCascadeProvider>
                </Box>
            );
        }
    );

    Component.displayName = displayName;

    return Component;
};
