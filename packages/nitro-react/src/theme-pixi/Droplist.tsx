import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { BackgroundLayer, BackgroundLayerConfig, CompositeLayer, NineSlice } from './layer';
import { Text } from './Text';
import { TextStyleKey, useResolvedVariant, wrapTextChildren } from './utils';

interface DroplistVariant {
    layer: BackgroundLayerConfig;
    overlay?: BackgroundLayerConfig;
    tintColor?: string;
    textStyleKey?: TextStyleKey;
    textColor?: string;
    arrowTextureKey: string;
    arrowTop: number;
    arrowRight: number;
}

type DroplistVariants = Record<string, DroplistVariant>;

const DROPLIST_VARIANTS: DroplistVariants = {
    '0': { layer: NineSlice('dropmenu-0-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-0-default-arrow-src', arrowTop: 2, arrowRight: 5 },
    '1': { layer: NineSlice('droplist-1-default-src', 6, 6, 6, 6), arrowTextureKey: 'droplist-1-default-arrow-src', arrowTop: 10, arrowRight: 4 },
};

export interface DroplistProps {
    variant?: keyof DroplistVariants;
    defaultVariant?: keyof DroplistVariants;
    tintColor?: string;
    textColor?: string;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const Droplist: ForwardRefExoticComponent<DroplistProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DroplistProps>(
    ({ variant, defaultVariant, tintColor, textColor, layout, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('droplist', variant, defaultVariant);
        const config = DROPLIST_VARIANTS[resolvedVariant] ?? DROPLIST_VARIANTS['0'];
        const resolvedTint = tintColor || config.tintColor;
        const resolvedTextColor = textColor ?? config.textColor;

        return (
            <Box ref={ref} layout={{ minWidth: 40, minHeight: 22, paddingLeft: 2, paddingRight: 2, ...config.layer, ...layout }}>
                <BackgroundLayer layer={config.layer} tintColor={resolvedTint} />
                {config.overlay && <BackgroundLayer layer={config.overlay} />}
                {config.arrowTextureKey && <CompositeLayer pieces={[{ textureKey: config.arrowTextureKey, right: config.arrowRight, top: config.arrowTop, width: 16, height: 16 }]} />}
                <VariantCascadeProvider map={ownCascade}>
                    {typeof children === 'string'
                        ? <Text text={children} textStyle={config.textStyleKey} textOptions={{ fill: resolvedTextColor }} />
                        : wrapTextChildren(children)}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

Droplist.displayName = 'Droplist';
