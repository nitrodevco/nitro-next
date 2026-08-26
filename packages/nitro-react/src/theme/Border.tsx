import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Composite, NineSlice, NineSliceBlendOverlay } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

type BorderVariant = ThemeVariant;

const BORDER_VARIANTS: ThemeVariants<BorderVariant> = {
    0: { layer: NineSlice('border-0-default-src', 6, 6, 6, 6) },
    1: { layer: NineSlice('border-1-default-src', 6, 6, 6, 6) },
    2: { layer: NineSlice('border-2-default-src', 6, 6, 6, 6) },
    3: { layer: NineSlice('border-3-default-src', 3, 3, 3, 3) },
    4: { layer: NineSlice('border-4-default-src', 6, 6, 6, 6) },
    5: { layer: NineSlice('border-5-default-src', 5, 5, 5, 5) },
    6: { layer: NineSlice('border-6-default-src', 8, 8, 8, 8) },
    7: { layer: NineSlice('border-7-default-src', 6, 6, 6, 7) },
    8: { layer: NineSlice('border-8-default-src', 10, 10, 10, 10) },
    9: { layer: NineSlice('border-9-default-src', 7, 7, 7, 8), tintColor: '#686661' },
    10: { layer: NineSlice('border-10-default-src', 6, 6, 6, 8) },
    100: { layer: NineSlice('border-100-default-src', 3, 3, 3, 3) },
    101: {
        layer: Composite([
            { textureKey: 'border-101-default-top-left-src', top: 0, left: 0, width: 4, height: 4 },
            { textureKey: 'border-101-default-top-center-src', top: 0, left: 4, right: 4, height: 4 },
            { textureKey: 'border-101-default-top-right-src', top: 0, right: 0, width: 4, height: 4 },
            { textureKey: 'border-101-default-center-left-src', left: 0, top: 4, bottom: 7, width: 1 },
            { textureKey: 'border-101-default-center-center-src', left: 1, right: 1, top: 4, bottom: 7 },
            { textureKey: 'border-101-default-center-left-src', right: 0, top: 4, bottom: 7, width: 1 },
            { textureKey: 'border-101-default-bottom-left-src', left: 0, bottom: 0, width: 4, height: 7 },
            { textureKey: 'border-101-default-bottom-center-src', left: 4, right: 4, bottom: 0, height: 7 },
            { textureKey: 'border-101-default-bottom-right-src', right: 0, bottom: 0, width: 4, height: 7 },
        ]),
    },
    102: {
        layer: Composite([
            { textureKey: 'border-102-default-top-left-src', top: 0, left: 0, width: 12, height: 14 },
            { textureKey: 'border-102-default-top-center-src', top: 0, left: 12, right: 6, height: 14 },
            { textureKey: 'border-102-default-top-right-src', top: 0, right: 0, width: 6, height: 14 },
            { textureKey: 'border-102-default-center-left-src', left: 0, top: 14, bottom: 4, width: 8 },
            { textureKey: 'border-102-default-center-center-src', left: 8, right: 1, top: 14, bottom: 4 },
            { textureKey: 'border-102-default-center-right-src', right: 0, top: 14, bottom: 4, width: 1 },
            { textureKey: 'border-102-default-bottom-left-src', left: 0, bottom: 0, width: 8, height: 4 },
            { textureKey: 'border-102-default-bottom-center-src', left: 8, right: 4, bottom: 0, height: 4 },
            { textureKey: 'border-102-default-bottom-right-src', right: 0, bottom: 0, width: 4, height: 4 },
        ]),
    },
    103: {
        layer: Composite([
            { textureKey: 'border-103-default-top-src', top: 0, left: 0, right: 0, height: 4 },
            { textureKey: 'border-103-default-center-src', top: 4, bottom: 12, left: 0, right: 0 },
            { textureKey: 'border-103-default-bottom-left-src', bottom: 0, left: 0, width: 4, height: 12 },
            { textureKey: 'border-103-default-bottom-center-src', bottom: 0, left: 4, right: 4, height: 12 },
            { textureKey: 'border-103-default-bottom-right-src', bottom: 0, right: 0, width: 4, height: 12 },
        ]),
    },
    104: {
        layer: NineSlice('border-104-default-src', 7, 7, 7, 7),
        overlay: Composite([
            { textureKey: 'border-104-default-border-top-left-src', top: 0, left: 0, width: 4, height: 4 },
            { textureKey: 'border-104-default-border-top-center-src', top: 0, left: 4, right: 4, height: 4 },
            { textureKey: 'border-104-default-border-top-right-src', top: 0, right: 0, width: 4, height: 4 },
            { textureKey: 'border-104-default-border-center-left-src', left: 0, top: 4, bottom: 5, width: 1 },
            { textureKey: 'border-104-default-border-center-left-src', right: 0, top: 4, bottom: 5, width: 1 },
            { textureKey: 'border-104-default-border-bottom-left-src', left: 0, bottom: 0, width: 4, height: 5 },
            { textureKey: 'border-104-default-border-bottom-center-src', left: 4, right: 4, bottom: 0, height: 5 },
            { textureKey: 'border-104-default-border-bottom-right-src', right: 0, bottom: 0, width: 4, height: 5 },
        ]),
    },
    105: {
        layer: NineSlice('border-105-default-src', 5, 5, 5, 5),
        overlay: NineSlice('border-105-default-shine-src', 5, 5, 5, 5),
    },
    106: {
        layer: Composite([
            { textureKey: 'border-106-default-top-left-src', top: 0, left: 0, width: 4, height: 5 },
            { textureKey: 'border-106-default-top-center-src', top: 0, left: 4, right: 4, height: 5 },
            { textureKey: 'border-106-default-top-right-src', top: 0, right: 0, width: 4, height: 5 },
            { textureKey: 'border-106-default-center-src', top: 5, bottom: 7, left: 0, right: 0 },
            { textureKey: 'border-106-default-bottom-left-src', bottom: 0, left: 0, width: 4, height: 7 },
            { textureKey: 'border-106-default-bottom-center-src', bottom: 0, left: 4, right: 4, height: 7 },
            { textureKey: 'border-106-default-bottom-right-src', bottom: 0, right: 0, width: 4, height: 7 },
        ]),
    },
    107: {
        layer: Composite([
            { textureKey: 'border-107-default-background-top-left-src', top: 0, left: 0, width: 5, height: 10 },
            { textureKey: 'border-107-default-background-top-center-src', top: 0, left: 5, right: 5, height: 10 },
            { textureKey: 'border-107-default-background-top-right-src', top: 0, right: 0, width: 5, height: 10 },
            { textureKey: 'border-107-default-background-center-left-src', left: 0, top: 10, bottom: 5, width: 1 },
            { textureKey: 'border-107-default-background-center-center-src', left: 1, right: 1, top: 10, bottom: 5 },
            { textureKey: 'border-107-default-background-center-left-src', right: 0, top: 10, bottom: 5, width: 1 },
            { textureKey: 'border-107-default-background-bottom-left-src', left: 0, bottom: 0, width: 5, height: 5 },
            { textureKey: 'border-107-default-background-bottom-center-src', left: 5, right: 5, bottom: 0, height: 5 },
            { textureKey: 'border-107-default-background-bottom-right-src', right: 0, bottom: 0, width: 5, height: 5 },
        ]),
    },
    108: { layer: NineSlice('border-108-default-src', 3, 3, 3, 3), tintColor: '#676767' },
    200: { layer: NineSlice('border-200-default-src', 3, 3, 3, 3) },
};

export interface BorderProps extends ThemeProps<BorderVariant> {
    blend?: number;
    children?: ReactNode;
}

export const Border: ForwardRefExoticComponent<BorderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BorderProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, blend, children }, ref) => {
        const { ownCascade, config, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'border', variants: BORDER_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
        });

        return (
            <Box
                ref={ref}
                layout={{ ...config.layout, ...layout }}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                {resolvedLayer && resolvedLayer.kind === 'nineSlice' && (
                    <NineSliceBlendOverlay
                        textureKey={resolvedLayer.textureKey}
                        leftWidth={resolvedLayer.leftWidth}
                        topHeight={resolvedLayer.topHeight}
                        rightWidth={resolvedLayer.rightWidth}
                        bottomHeight={resolvedLayer.bottomHeight}
                        blend={blend}
                    />
                )}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Border.displayName = 'Border';
