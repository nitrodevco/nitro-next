import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box } from './Box';
import { BackgroundLayer, NineSlice } from './layer';
import { useResolvedVariant, wrapTextChildren } from './utils';
import { ThemeProps, ThemeVariant, ThemeVariants } from './variant';

type TabContentVariant = ThemeVariant;

const TAB_CONTENT_VARIANTS: ThemeVariants<TabContentVariant> = {
    // default
    '0': {
        layer: NineSlice('border-0-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // black
    '1': {
        layer: NineSlice('border-1-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // white
    '2': {
        layer: NineSlice('border-2-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // shiny
    '3': {
        layer: NineSlice('tabcontent-3-default-src', 0, 15, 0, 0),
        layout: { paddingTop: 6, paddingLeft: 5, paddingRight: 5, paddingBottom: 2, marginTop: -2 },
    },
};

export interface TabContentProps extends ThemeProps<TabContentVariant> {
    children?: ReactNode;
}

export const TabContent: ForwardRefExoticComponent<TabContentProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TabContentProps>(
    ({ variant, defaultVariant, layout, tintColor, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('tabContent', variant, defaultVariant);
        const config = TAB_CONTENT_VARIANTS[resolvedVariant] ?? TAB_CONTENT_VARIANTS['0'];
        const resolvedTint = tintColor || config.tintColor;

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
                <BackgroundLayer layer={config.layer} tintColor={resolvedTint} />
                <BackgroundLayer layer={config.overlay} />
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    }
);

TabContent.displayName = 'TabContent';
