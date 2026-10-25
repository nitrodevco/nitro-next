import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useResolvedVariant } from './hooks';
import { expandSides, ThemeVariant, wrapTextChildren } from './utils';
import { themeVariantOf } from './utils/themeRegistry';

export interface ScrollableItemProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    children?: ReactNode;
}

/**
 * A scrollable item list or grid window (`ScrollableItemListWindow`, `ScrollableItemGridWindow`)
 * as a theme component: no art of its own - a box that holds the list or grid content, at least
 * as big as its window layout (the variants of `cascadeKey`), and cascades its style to it.
 */
export const createScrollableItemComponent = (displayName: string, cascadeKey: string): ForwardRefExoticComponent<ScrollableItemProps & RefAttributes<PixiContainer>> => {
    const Component = forwardRef<PixiContainer, ScrollableItemProps>(
        ({ variant, defaultVariant, layout, children }, ref) => {
            const { resolvedVariant, ownCascade } = useResolvedVariant(cascadeKey, variant, defaultVariant);
            const config = themeVariantOf<ThemeVariant>(cascadeKey, resolvedVariant) ?? themeVariantOf<ThemeVariant>(cascadeKey, '0');

            return (
                <Box
                    ref={ref}
                    layout={{ ...expandSides(config?.layout), ...expandSides(layout) }}
                >
                    <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
                </Box>
            );
        },
    );

    Component.displayName = displayName;

    return Component;
};

export type ScrollableItemGridVerticalProps = ScrollableItemProps;

/** `scrollable_itemgrid_vertical`: its variants are the theme's `scrollableItemGridVertical`. */
export const ScrollableItemGridVertical = createScrollableItemComponent('ScrollableItemGridVertical', 'scrollableItemGridVertical');
