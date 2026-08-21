import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

/**
 * Per-variant layout on top of the always-on base (full-width flex row, no gap, 5px
 * left/right padding, 4px top padding, z-index 20 - theme/TabContext.tsx's `w-full flex
 * gap-0 px-1.25 pt-1 z-20`). '0' is a fixed-height row (`min-h-5.5 max-h-5.5`, 22px); '3'
 * (the "shiny" top-level frame tab bar) has no min/max height of its own, sizing to its
 * children instead.
 */
const TAB_CONTEXT_VARIANTS: Record<string, BoxLayout> = {
    '0': { minHeight: 22, maxHeight: 22 },
    '3': {},
};

export interface TabContextProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    children?: ReactNode;
}

/**
 * Pixi port of theme/TabContext.tsx - the tab bar row a Frame's TabButtons sit inside. Plain
 * layout only: no interactivity, no tint, no border-image art of its own.
 */
export const TabContext: ForwardRefExoticComponent<TabContextProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabContextProps>(
    ({ variant, defaultVariant, layout, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('tabContext', variant, defaultVariant);

        return (
            <Box
                ref={ref}
                zIndex={20}
                layout={{
                    flexDirection: 'row',
                    width: '100%',
                    gap: 0,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 4,
                    ...TAB_CONTEXT_VARIANTS[resolvedVariant],
                    ...layout,
                }}
            >
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    }
);

TabContext.displayName = 'TabContext';
