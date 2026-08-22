import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box } from './Box';
import { BackgroundLayer, CompositeLayer, NineSlice } from './layer';
import { Text } from './Text';
import { useThemeVariant, wrapTextChildren } from './utils';
import { ThemeProps, ThemeVariant, ThemeVariants } from './variant';

type DroplistVariant = ThemeVariant & {
    arrowTextureKey: string;
    arrowTop: number;
    arrowRight: number;
};

const DROPLIST_VARIANTS: ThemeVariants<DroplistVariant> = {
    '0': { layer: NineSlice('dropmenu-0-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-0-default-arrow-src', arrowTop: 2, arrowRight: 5 },
    '1': { layer: NineSlice('droplist-1-default-src', 6, 6, 6, 6), arrowTextureKey: 'droplist-1-default-arrow-src', arrowTop: 10, arrowRight: 4 },
};

export interface DroplistProps extends ThemeProps<DroplistVariant> {
    children?: ReactNode;
}

export const Droplist: ForwardRefExoticComponent<DroplistProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DroplistProps>(
    ({ variant, defaultVariant, tintColor, textColor, layout, children }, ref) => {
        const { ownCascade, config, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'droplist', variants: DROPLIST_VARIANTS, variant, defaultVariant, tintColor, textColor,
        });

        return (
            <Box ref={ref} layout={{ minWidth: 40, minHeight: 22, paddingLeft: 2, paddingRight: 2, ...config.layout, ...layout }}>
                <BackgroundLayer layer={resolvedLayer} tintColor={resolvedTint} />
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
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
