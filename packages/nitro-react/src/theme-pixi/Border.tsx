import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { BackgroundLayer, type BackgroundLayerConfig, BlendOverlay, type CompositePiece } from './utils/Layer';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

interface BorderVariant {
    layer: BackgroundLayerConfig;
    overlay?: BackgroundLayerConfig;
}

const nineSlice = (textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number): BackgroundLayerConfig => (
    { kind: 'nineSlice', textureKey, leftWidth, topHeight, rightWidth, bottomHeight }
);

const composite = (pieces: CompositePiece[]): BackgroundLayerConfig => ({ kind: 'composite', pieces });

/**
 * Full port of theme/Border.tsx's 19-variant table. Variant '100' is the one DOM variant
 * whose `border-image-slice` omits the `fill` keyword, meaning CSS leaves its center
 * transparent instead of rendering a stretched center tile - Pixi's NineSliceSprite has no
 * equivalent "don't fill the center" mode, so this port always fills it. Low-impact in
 * practice (border content is opaque in every real usage found), flagged rather than
 * silently diverging without a note.
 */
const BORDER_VARIANTS: Record<string, BorderVariant> = {
    '0': { layer: nineSlice('border-0-default-src', 6, 6, 6, 6) },
    '1': { layer: nineSlice('border-1-default-src', 6, 6, 6, 6) },
    '2': { layer: nineSlice('border-2-default-src', 6, 6, 6, 6) },
    '3': { layer: nineSlice('border-3-default-src', 3, 3, 3, 3) },
    '4': { layer: nineSlice('border-4-default-src', 6, 6, 6, 6) },
    '5': { layer: nineSlice('border-5-default-src', 5, 5, 5, 5) },
    '6': { layer: nineSlice('border-6-default-src', 8, 8, 8, 8) },
    '7': { layer: nineSlice('border-7-default-src', 6, 6, 6, 7) },
    '8': { layer: nineSlice('border-8-default-src', 10, 10, 10, 10) },
    '9': { layer: nineSlice('border-9-default-src', 7, 7, 7, 8) },
    '10': { layer: nineSlice('border-10-default-src', 6, 6, 6, 8) },
    '100': { layer: nineSlice('border-100-default-src', 3, 3, 3, 3) },
    '101': {
        layer: composite([
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
    '102': {
        layer: composite([
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
    '103': {
        layer: composite([
            { textureKey: 'border-103-default-top-src', top: 0, left: 0, right: 0, height: 4 },
            { textureKey: 'border-103-default-center-src', top: 4, bottom: 12, left: 0, right: 0 },
            { textureKey: 'border-103-default-bottom-left-src', bottom: 0, left: 0, width: 4, height: 12 },
            { textureKey: 'border-103-default-bottom-center-src', bottom: 0, left: 4, right: 4, height: 12 },
            { textureKey: 'border-103-default-bottom-right-src', bottom: 0, right: 0, width: 4, height: 12 },
        ]),
    },
    '104': {
        layer: nineSlice('border-104-default-src', 7, 7, 7, 7),
        overlay: composite([
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
    '105': {
        layer: nineSlice('border-105-default-src', 5, 5, 5, 5),
        overlay: nineSlice('border-105-default-shine-src', 5, 5, 5, 5),
    },
    '106': {
        layer: composite([
            { textureKey: 'border-106-default-top-left-src', top: 0, left: 0, width: 4, height: 5 },
            { textureKey: 'border-106-default-top-center-src', top: 0, left: 4, right: 4, height: 5 },
            { textureKey: 'border-106-default-top-right-src', top: 0, right: 0, width: 4, height: 5 },
            { textureKey: 'border-106-default-center-src', top: 5, bottom: 7, left: 0, right: 0 },
            { textureKey: 'border-106-default-bottom-left-src', bottom: 0, left: 0, width: 4, height: 7 },
            { textureKey: 'border-106-default-bottom-center-src', bottom: 0, left: 4, right: 4, height: 7 },
            { textureKey: 'border-106-default-bottom-right-src', bottom: 0, right: 0, width: 4, height: 7 },
        ]),
    },
    '107': {
        layer: composite([
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
    '108': { layer: nineSlice('border-108-default-src', 3, 3, 3, 3) },
    '200': { layer: nineSlice('border-200-default-src', 3, 3, 3, 3) },
};

const BORDER_TINT_COLORS: Partial<Record<string, string>> = {
    '9': '#686661',
    '108': '#676767',
};

export interface BorderProps {
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    /** White-wash overlay strength (0-1), applied only when the resolved variant's base
     *  layer is a single nine-slice texture - see theme/Border.tsx's `blend` prop. */
    blend?: number;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const Border: ForwardRefExoticComponent<BorderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BorderProps>(
    ({ variant, defaultVariant, tintColor, blend, layout, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('border', variant, defaultVariant);
        const resolvedTint = tintColor || BORDER_TINT_COLORS[resolvedVariant];
        const config = BORDER_VARIANTS[resolvedVariant] ?? BORDER_VARIANTS['0'];

        return (
            <Box ref={ref} layout={layout}>
                <BackgroundLayer layer={config.layer} tint={resolvedTint} />
                <BackgroundLayer layer={config.overlay} />
                {config.layer.kind === 'nineSlice' && (
                    <BlendOverlay
                        textureKey={config.layer.textureKey}
                        leftWidth={config.layer.leftWidth}
                        topHeight={config.layer.topHeight}
                        rightWidth={config.layer.rightWidth}
                        bottomHeight={config.layer.bottomHeight}
                        blend={blend}
                    />
                )}
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    }
);

Border.displayName = 'Border';
