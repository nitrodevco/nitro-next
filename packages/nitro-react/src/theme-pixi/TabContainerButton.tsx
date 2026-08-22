import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme-core';

import { Box, type BoxLayout } from './Box';
import { BackgroundLayer } from './layer';
import { TAB_BUTTON_CHROME_VARIANTS } from './utils/tabButtonChrome';
import { resolveByState, useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

export interface TabContainerButtonProps {
    variant?: string;
    defaultVariant?: string;
    /** Pixi equivalent of the DOM `aria-selected` prop - see TabButton.tsx. */
    selected?: boolean;
    layout?: BoxLayout;
    onPress?: () => void;
    children?: ReactNode;
}

/**
 * Pixi port of theme/TabContainerButton.tsx - structurally the same 4-variant tab chrome as
 * TabButton (same border-image sources/slices/states, shared via utils/tabButtonChrome.tsx),
 * but DOM's `cva` base class here is `''`: no padding, no min-size, no text-style classes at
 * all. It's a bare "wrap arbitrary content in tab-button chrome" primitive, entirely
 * caller-sized via `layout` - same relationship as Button.tsx has to ContainerButton.tsx.
 */
export const TabContainerButton: ForwardRefExoticComponent<TabContainerButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabContainerButtonProps>(
    ({ variant, defaultVariant, selected, layout, onPress, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('tabContainerButton', variant, defaultVariant);
        const chrome = TAB_BUTTON_CHROME_VARIANTS[resolvedVariant] ?? TAB_BUTTON_CHROME_VARIANTS['0'];
        const { state, handlers } = useInteractionState();
        const resolvedLayer = resolveByState(chrome, state, selected);

        return (
            <Box
                ref={ref}
                layout={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', ...layout }}
                {...handlers}
                cursor="pointer"
                onPointerTap={onPress}
            >
                <BackgroundLayer layer={resolvedLayer} />
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    }
);

TabContainerButton.displayName = 'TabContainerButton';
