import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme-core';

import { Box, BoxLayout } from './Box';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

/**
 * Full port of theme/ScrollableItemGridVertical.tsx's 2-variant table. Same as
 * ScrollableItemListVertical.tsx: no background art, no hover/press/selected state classes,
 * just `min-w-10 min-h-10 text-[#000000]` shared identically by both variants - a plain
 * presentational sizing/text-color leaf meant to sit inside a scrollable grid content area
 * (e.g. InfiniteGrid), not a themed control in its own right.
 */
const SCROLLABLE_ITEM_GRID_VERTICAL_VARIANTS: Record<string, { minWidth: number; minHeight: number }> = {
    0: { minWidth: 40, minHeight: 40 },
    3: { minWidth: 40, minHeight: 40 },
};

export interface ScrollableItemGridVerticalProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const ScrollableItemGridVertical: ForwardRefExoticComponent<ScrollableItemGridVerticalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollableItemGridVerticalProps>(
    ({ variant, defaultVariant, layout, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('scrollableItemGridVertical', variant, defaultVariant);
        const config = SCROLLABLE_ITEM_GRID_VERTICAL_VARIANTS[resolvedVariant] ?? SCROLLABLE_ITEM_GRID_VERTICAL_VARIANTS['0'];

        return (
            <Box
                ref={ref}
                layout={{ minWidth: config.minWidth, minHeight: config.minHeight, ...layout }}
            >
                {/* DOM's `text-[#000000]` needs no explicit style here - PixiJS's own default
                    TextStyle fill is already black, matching by coincidence, not override. */}
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    },
);

ScrollableItemGridVertical.displayName = 'ScrollableItemGridVertical';
