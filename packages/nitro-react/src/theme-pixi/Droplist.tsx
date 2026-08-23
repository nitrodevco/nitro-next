import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { ThemeProps, ThemeVariant, ThemeVariants, VariantCascadeProvider } from '#base/theme-core';

import { Box } from './Box';
import { BackgroundLayer, CompositeLayer, NineSlice } from './layer';
import { useThemeVariant, wrapTextChildren } from './utils';

type DroplistVariant = ThemeVariant & {
    arrowTextureKey: string;
    arrowTop: number;
    arrowRight: number;
};

const DROPLIST_VARIANTS: ThemeVariants<DroplistVariant> = {
    0: { layer: NineSlice('dropmenu-0-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-0-default-arrow-src', arrowTop: 2, arrowRight: 5 },
    1: { layer: NineSlice('droplist-1-default-src', 6, 6, 6, 6), arrowTextureKey: 'droplist-1-default-arrow-src', arrowTop: 10, arrowRight: 4 },
};

export interface DroplistProps extends ThemeProps<DroplistVariant> {
    children?: ReactNode;
}

export const Droplist: ForwardRefExoticComponent<DroplistProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, DroplistProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, children }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'droplist', variants: DROPLIST_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
        });

        return (
            <Box
                ref={ref}
                layout={{ minWidth: 40, minHeight: 22, paddingLeft: 2, paddingRight: 2, ...config.layout, ...layout }}
                {...handlers}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                {config.arrowTextureKey && <CompositeLayer pieces={[ { textureKey: config.arrowTextureKey, right: config.arrowRight, top: config.arrowTop, width: 16, height: 16 } ]} />}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Droplist.displayName = 'Droplist';
