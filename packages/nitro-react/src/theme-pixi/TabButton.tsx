import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { NineSliceLayer } from './utils/Layer';
import { TAB_BUTTON_CHROME_VARIANTS } from './utils/tabButtonChrome';
import { getPixiTextStyle, type TextStyleKey } from './utils/textStyles';
import { resolveByState, useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';

interface TabButtonVariant {
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    minWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    textStyleKey: TextStyleKey;
    color: string;
}

/**
 * Full port of theme/TabButton.tsx's sizing/text half of its 4-variant table (the border-image
 * half lives in utils/tabButtonChrome.tsx, shared with TabContainerButton). '2' (white) reuses
 * '1'/'0' sizing values wholesale (`min-w-5 min-h-5.5 pl-2 pt-0.5 pr-2 pb-1`) - confirmed from
 * the DOM class string, not assumed, same as its art reuse. '3' (shiny/pill, top-level frame
 * tabs) has no min-width or vertical padding of its own - just a fixed 32px height band and
 * 10px horizontal padding, letting `items-center` center its content vertically.
 */
const TAB_BUTTON_VARIANTS: Record<string, TabButtonVariant> = {
    // default
    '0': {
        paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-tab', color: '#000000',
    },
    // black
    '1': {
        paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-tab', color: '#ffffff',
    },
    // white - reuses '0's sizing wholesale
    '2': {
        paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-tab', color: '#000000',
    },
    // shiny/pill
    '3': {
        paddingLeft: 10, paddingTop: 0, paddingRight: 10, paddingBottom: 0,
        minHeight: 32, maxHeight: 32,
        textStyleKey: 'text-style-button-shiny-regular', color: '#000000',
    },
};

export interface TabButtonProps {
    variant?: string;
    defaultVariant?: string;
    /** Pixi equivalent of the DOM `aria-selected` prop - collapses with an in-progress
     *  pointer press onto the same "selected" art, matching DOM's `aria-selected:`/`active:`
     *  modifiers resolving to identical border-images. */
    selected?: boolean;
    layout?: BoxLayout;
    onPress?: () => void;
    children?: ReactNode;
}

/**
 * Pixi port of theme/TabButton.tsx - a single interactive tab. Like its DOM source, this is
 * fully presentational/controlled: it carries no internal "am I the active tab" state, the
 * caller owns that and passes `selected` + `onPress`.
 */
export const TabButton: ForwardRefExoticComponent<TabButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabButtonProps>(
    ({ variant, defaultVariant, selected, layout, onPress, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('tabButton', variant, defaultVariant);
        const chrome = TAB_BUTTON_CHROME_VARIANTS[resolvedVariant] ?? TAB_BUTTON_CHROME_VARIANTS['0'];
        const config = TAB_BUTTON_VARIANTS[resolvedVariant] ?? TAB_BUTTON_VARIANTS['0'];
        const { state, handlers } = useInteractionState();
        const resolvedLayer = resolveByState(chrome, state, selected);

        return (
            <Box
                ref={ref}
                layout={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: config.paddingLeft,
                    paddingTop: config.paddingTop,
                    paddingRight: config.paddingRight,
                    paddingBottom: config.paddingBottom,
                    minWidth: config.minWidth,
                    minHeight: config.minHeight,
                    maxHeight: config.maxHeight,
                    ...layout,
                }}
                {...handlers}
                cursor="pointer"
                onPointerTap={onPress}
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
                        : children}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

TabButton.displayName = 'TabButton';
