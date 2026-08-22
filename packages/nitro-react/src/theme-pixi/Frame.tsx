import './utils/pixiElements';

import { DropShadowFilter } from 'pixi-filters';
import { type ReactNode, useMemo } from 'react';

import { VariantCascadeProvider } from '#base/theme';
import { GetPixelRatio } from '#base/utils';

import { Box, type BoxLayout } from './Box';
import { ContentArea } from './ContentArea';
import { Header } from './Header';
import { Scaler, type ScalerDirection } from './Scaler';
import { Composite } from './utils';
import { BackgroundLayer, type BackgroundLayerConfig } from './utils/Layer';
import { NineSlice } from './utils/NineSlice';
import { useFrameDrag } from './utils/useFrameDrag';
import { useFrameResize } from './utils/useFrameResize';
import { useResolvedVariant } from './utils/useResolvedVariant';

interface FrameVariant {
    layer?: BackgroundLayerConfig;
    overlay?: BackgroundLayerConfig;
    minWidth: number;
    minHeight: number;
    tint?: string;
}

type FrameVariants = Record<string, FrameVariant>;

const BLUE_FRAME_SHINE = Composite([
    { textureKey: 'frame-0-default-shine-top-left-src', left: 1, top: 1, width: 7, height: 7 },
    { textureKey: 'frame-0-default-shine-top-center-src', left: 8, right: 8, top: 2, height: 1 },
    { textureKey: 'frame-0-default-shine-top-right-src', right: 1, top: 1, width: 7, height: 7 },
    { textureKey: 'frame-0-default-shine-top-center-src', left: 2, top: 8, bottom: 8, width: 1 },
    { textureKey: 'frame-0-default-shine-top-center-src', right: 2, top: 8, bottom: 7, width: 1 },
    { textureKey: 'frame-0-default-shine-bottom-left-src', left: 1, bottom: 1, width: 7, height: 7 },
    { textureKey: 'frame-0-default-shine-top-center-src', left: 8, right: 7, bottom: 2, height: 1 },
    { textureKey: 'frame-0-default-shine-bottom-right-src', right: 1, bottom: 1, width: 6, height: 6 },
]);

const FRAME_3_SHINE = NineSlice('frame-3-default-shine-src', 10, 33, 10, 10);

const FRAME_VARIANTS: FrameVariants = {
    '0': { layer: NineSlice('frame-0-default-src', 13, 13, 13, 13), overlay: BLUE_FRAME_SHINE, minWidth: 40, minHeight: 40, tint: '#418db0' },
    '1': { layer: NineSlice('frame-0-default-src', 13, 13, 13, 13), overlay: BLUE_FRAME_SHINE, minWidth: 40, minHeight: 40, tint: '#4c4c4c' },
    '2': { layer: NineSlice('frame-0-default-src', 13, 13, 13, 13), overlay: BLUE_FRAME_SHINE, minWidth: 40, minHeight: 40, tint: '#fac200' },
    '3': { layer: NineSlice('frame-3-default-src', 10, 33, 10, 10), overlay: FRAME_3_SHINE, minWidth: 64, minHeight: 64, tint: '#418db0' },
    '4': { layer: NineSlice('frame-3-default-src', 10, 33, 10, 10), overlay: FRAME_3_SHINE, minWidth: 64, minHeight: 64, tint: '#67a3bf' },
    '7': { layer: NineSlice('frame-3-default-src', 10, 33, 10, 10), overlay: FRAME_3_SHINE, minWidth: 64, minHeight: 73 },
    '100': {
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
        ]), minWidth: 50, minHeight: 50
    },
    '101': { minWidth: 50, minHeight: 80 },
    '200': { layer: NineSlice('frame-200-default-src', 4, 4, 4, 5), minWidth: 50, minHeight: 50 },
};

export interface FrameProps {
    id?: string;
    variant?: keyof FrameVariants;
    defaultVariant?: string;
    caption?: string;
    tintColor?: string;
    layout?: BoxLayout;
    resizeDirection?: ScalerDirection;
    onClose?: () => void;
    children?: ReactNode;
}

/**
 * Pixi port of theme/Frame.tsx - a draggable, resizable window: nine-slice/composite
 * border/background (+ optional shine overlay), Header (caption + close button, drag
 * handle), ContentArea (children), Scaler (resize handle), and the universal drop-shadow
 * (`drop-shadow-[2.83px_2.83px_4px_rgba(0,0,0,0.349)]`, applied to every DOM variant
 * unconditionally) via a Pixi DropShadowFilter. Reuses the DOM package's variant-cascade
 * system and SystemStore z-order/window registry verbatim (both are pure React
 * context/zustand, no DOM dependency) via useFrameDrag.ts/useFrameResize.ts's Pixi ports
 * of hooks/ui/useFrameDrag.ts/useFrameResize.ts.
 */
export const Frame = ({ id, variant, defaultVariant, caption, tintColor, layout, resizeDirection = 'all', onClose, children }: FrameProps) => {
    const { resolvedVariant, ownCascade } = useResolvedVariant('frame', variant, defaultVariant);
    const config = FRAME_VARIANTS[resolvedVariant] ?? FRAME_VARIANTS['0'];
    const resolvedTint = tintColor || config.tint;

    const { frameRef, offset, zIndex, onPointerDown, onHeaderPointerDown } = useFrameDrag(id);
    const { size, onScalerPointerDown } = useFrameResize(id, frameRef, resizeDirection, { width: config.minWidth, height: config.minHeight });

    const dropShadowFilter = useMemo(() => new DropShadowFilter({ offset: { x: 2.83, y: 2.83 }, blur: 4, color: 0x000000, alpha: 0.349, resolution: GetPixelRatio() }), []);

    return (
        <Box
            ref={frameRef}
            x={offset.dx}
            y={offset.dy}
            zIndex={zIndex}
            eventMode="static"
            filters={[dropShadowFilter]}
            onPointerDown={onPointerDown}
            layout={{
                flexDirection: 'column',
                minWidth: config.minWidth,
                minHeight: config.minHeight,
                width: config.minWidth,
                height: config.minHeight,
                // The caller's own layout (e.g. an explicit width/height, analogous to the DOM
                // Frame's className w-*/h-* defaults) comes next, then - if the user has
                // actively resized this frame (a stored/dragged size) - that wins for
                // width/height specifically, the same way the DOM version's resize-driven
                // inline style out-specifies its own className defaults.
                ...layout,
                ...(size && { width: size.width, height: size.height }),
            }}
        >
            <BackgroundLayer layer={config.layer} tint={resolvedTint} />
            <BackgroundLayer layer={config.overlay} />
            <VariantCascadeProvider map={ownCascade}>
                <Header caption={caption} tintColor={resolvedTint} onClose={onClose} onPointerDown={onHeaderPointerDown} />
                <ContentArea>
                    {children}
                </ContentArea>
                <Scaler direction={resizeDirection} onPointerDown={onScalerPointerDown} />
            </VariantCascadeProvider>
        </Box>
    );
};

Frame.displayName = 'Frame';