import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useResolvedVariant } from './hooks';
import { wrapTextChildren } from './utils';

/**
 * Full port of theme/ScrollableItemListVertical.tsx's 3-variant table. Unlike most other
 * theme components, DOM's source here carries no background art and no hover/press/
 * selected state classes at all - just `min-w-10 min-h-10 text-[#000000]`, identical across
 * all three variants (confirmed directly from source; earlier task notes describing a
 * "background + hover/selected art swap" for this component don't match what's actually
 * there). It's a plain presentational sizing/text-color leaf, meant to be placed inside a
 * scrollable content area by a caller (e.g. InfiniteGrid) that supplies its own children.
 */
const SCROLLABLE_ITEM_LIST_VERTICAL_VARIANTS: Record<string, { minWidth: number; minHeight: number }> = {
    0: { minWidth: 40, minHeight: 40 },
    3: { minWidth: 40, minHeight: 40 },
    100: { minWidth: 40, minHeight: 40 },
};

export interface ScrollableItemListVerticalProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const ScrollableItemListVertical: ForwardRefExoticComponent<ScrollableItemListVerticalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollableItemListVerticalProps>(
    ({ variant, defaultVariant, layout, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('scrollableItemListVertical', variant, defaultVariant);
        const config = SCROLLABLE_ITEM_LIST_VERTICAL_VARIANTS[resolvedVariant] ?? SCROLLABLE_ITEM_LIST_VERTICAL_VARIANTS['0'];

        return (
            <Box
                ref={ref}
                layout={{ minWidth: config.minWidth, minHeight: config.minHeight, ...layout }}
            >
                {/* DOM's `text-[#000000]` needs no explicit style here - PixiJS's own default
                    TextStyle fill is already black, so wrapTextChildren's unstyled pixiText
                    matches it by coincidence rather than by an explicit override. */}
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    },
);

ScrollableItemListVertical.displayName = 'ScrollableItemListVertical';
