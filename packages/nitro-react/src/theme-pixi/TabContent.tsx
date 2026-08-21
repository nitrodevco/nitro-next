import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { NineSliceLayer } from './utils/Layer';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

interface TabContentLayer {
    textureKey: string;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
}

interface TabContentVariant {
    layer: TabContentLayer;
    layout: BoxLayout;
}

const layer = (textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number): TabContentLayer => (
    { textureKey, leftWidth, topHeight, rightWidth, bottomHeight }
);

/**
 * Full port of theme/TabContent.tsx's 4-variant table. '0'/'1'/'2' reuse Border's own
 * `border-{n}-default-src` art at a symmetric 6px slice/width (`p-1.5` = 6px padding all
 * round). '3' (the "shiny" panel tucked under a shiny TabContext bar) is genuinely
 * asymmetric: DOM's `border-image-slice:15_0_2_0_fill` / `border-image-width:15px_0px_0px_0px`
 * slices a 2px strip off the bottom but renders it at 0 width - only the TOP edge (15px) is
 * actually drawn, matching every other nine-slice port in this package which follows the
 * *width* numbers (what renders) over the *slice* numbers (where the art comes from). It also
 * carries a `-mt-0.5` (-2px) negative top margin to tuck under the tab bar above it, and
 * asymmetric padding (`pt-1.5 px-1.25 pb-0.5` = 6px/5px/2px) instead of the flat 6px the other
 * three variants use.
 */
const TAB_CONTENT_VARIANTS: Record<string, TabContentVariant> = {
    // default
    '0': {
        layer: layer('border-0-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // black
    '1': {
        layer: layer('border-1-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // white
    '2': {
        layer: layer('border-2-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // shiny
    '3': {
        layer: layer('tabcontent-3-default-src', 0, 15, 0, 0),
        layout: { paddingTop: 6, paddingLeft: 5, paddingRight: 5, paddingBottom: 2, marginTop: -2 },
    },
};

export interface TabContentProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    children?: ReactNode;
}

/**
 * Pixi port of theme/TabContent.tsx - the panel background behind a Frame's active tab
 * content. No interactivity, no tint, no overlay.
 */
export const TabContent: ForwardRefExoticComponent<TabContentProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabContentProps>(
    ({ variant, defaultVariant, layout, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('tabContent', variant, defaultVariant);
        const config = TAB_CONTENT_VARIANTS[resolvedVariant] ?? TAB_CONTENT_VARIANTS['0'];

        return (
            <Box
                ref={ref}
                zIndex={10}
                layout={{
                    height: '100%',
                    overflow: 'hidden',
                    ...config.layout,
                    ...layout,
                }}
            >
                <NineSliceLayer
                    textureKey={config.layer.textureKey}
                    leftWidth={config.layer.leftWidth}
                    topHeight={config.layer.topHeight}
                    rightWidth={config.layer.rightWidth}
                    bottomHeight={config.layer.bottomHeight}
                />
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    }
);

TabContent.displayName = 'TabContent';
