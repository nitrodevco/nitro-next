import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { Text } from './Text';
import { CompositeLayer, NineSliceLayer } from './utils/Layer';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

interface DroplistVariant {
    textureKey: string;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    arrowTextureKey: string;
    arrowTop: number;
    arrowRight: number;
}

/**
 * Static-skinning port of theme/Droplist.tsx - like Dropmenu/Tooltip, confirmed to have no
 * call sites and no open/close/positioning logic anywhere in DOM. Variant/tint/overlay-arrow
 * art only.
 */
const DROPLIST_VARIANTS: Record<string, DroplistVariant> = {
    '0': { textureKey: 'dropmenu-0-default-src', leftWidth: 3, topHeight: 3, rightWidth: 3, bottomHeight: 3, arrowTextureKey: 'dropmenu-0-default-arrow-src', arrowTop: 2, arrowRight: 5 },
    '1': { textureKey: 'droplist-1-default-src', leftWidth: 6, topHeight: 6, rightWidth: 6, bottomHeight: 6, arrowTextureKey: 'droplist-1-default-arrow-src', arrowTop: 10, arrowRight: 4 },
};

export interface DroplistProps {
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const Droplist: ForwardRefExoticComponent<DroplistProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DroplistProps>(
    ({ variant, defaultVariant, tintColor, layout, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('droplist', variant, defaultVariant);
        const config = DROPLIST_VARIANTS[resolvedVariant] ?? DROPLIST_VARIANTS['0'];

        return (
            <Box ref={ref} layout={{ minWidth: 40, minHeight: 22, paddingLeft: 2, paddingRight: 2, ...layout }}>
                <NineSliceLayer textureKey={config.textureKey} leftWidth={config.leftWidth} topHeight={config.topHeight} rightWidth={config.rightWidth} bottomHeight={config.bottomHeight} tint={tintColor} />
                <CompositeLayer pieces={[{ textureKey: config.arrowTextureKey, right: config.arrowRight, top: config.arrowTop, width: 16, height: 16 }]} />
                <VariantCascadeProvider map={ownCascade}>
                    {typeof children === 'string'
                        ? <Text text={children} textStyle="text-style-regular" textOptions={{ fill: '#000000' }} />
                        : wrapTextChildren(children)}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

Droplist.displayName = 'Droplist';
