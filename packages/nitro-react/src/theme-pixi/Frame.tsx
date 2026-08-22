import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';
import { type ReactNode, type Ref } from 'react';

import { VariantCascadeProvider } from '#base/theme-core';
import { GetPixelRatio } from '#base/utils';

import { Box } from './Box';
import { ContentArea } from './ContentArea';
import { Header } from './Header';
import { BackgroundLayer, Composite } from './layer';
import { NineSlice } from './layer/NineSlice';
import { Scaler, type ScalerDirection } from './Scaler';
import { useFrameDrag } from './utils/useFrameDrag';
import { useFrameResize } from './utils/useFrameResize';
import { useThemeVariant } from './utils/useThemeVariant';
import { ThemeProps, ThemeVariant, ThemeVariants } from './variant';

type FrameVariant = ThemeVariant & {
    minWidth: number;
    minHeight: number;
};

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

const FRAME_VARIANTS: ThemeVariants<FrameVariant> = {
    '0': { layer: NineSlice('frame-0-default-src', 13, 13, 13, 13), overlay: BLUE_FRAME_SHINE, minWidth: 40, minHeight: 40, tintColor: '#418db0' },
    '1': { layer: NineSlice('frame-0-default-src', 13, 13, 13, 13), overlay: BLUE_FRAME_SHINE, minWidth: 40, minHeight: 40, tintColor: '#4c4c4c' },
    '2': { layer: NineSlice('frame-0-default-src', 13, 13, 13, 13), overlay: BLUE_FRAME_SHINE, minWidth: 40, minHeight: 40, tintColor: '#fac200' },
    '3': { layer: NineSlice('frame-3-default-src', 10, 33, 10, 10), overlay: FRAME_3_SHINE, minWidth: 64, minHeight: 64, tintColor: '#418db0' },
    '4': { layer: NineSlice('frame-3-default-src', 10, 33, 10, 10), overlay: FRAME_3_SHINE, minWidth: 64, minHeight: 64, tintColor: '#67a3bf' },
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

export interface FrameProps extends ThemeProps<FrameVariant> {
    id?: string;
    caption?: string;
    resizeDirection?: ScalerDirection;
    onClose?: () => void;
    children?: ReactNode;
}

const dropShadow = new DropShadowFilter({ offset: { x: 2.83, y: 2.83 }, blur: 4, color: 0x000000, alpha: 0.349, resolution: GetPixelRatio() });

export const Frame = ({ id, variant, defaultVariant, caption, tintColor, layout, resizeDirection = 'all', onClose, children }: FrameProps) => {
    const { ownCascade, config, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
        cascadeKey: 'frame', variants: FRAME_VARIANTS, variant, defaultVariant, tintColor,
    });
    const { frameRef, offset, zIndex, onPointerDown, onHeaderPointerDown } = useFrameDrag(id);
    const { size, onScalerPointerDown } = useFrameResize(id, frameRef, resizeDirection, { width: config.minWidth, height: config.minHeight });

    return (
        <Box
            // frameRef is PixiContainer | HTMLElement (see useFrameDrag/getGlobalRect - it
            // reads whichever Box actually attached at runtime, Container in Pixi mode or a
            // plain div in DOM mode), wider than Box's own always-Container-typed ref contract
            // (see Box.tsx's own docblock on that choice) - safe to redirect here since Box
            // itself is what produces the HTMLElement value this ref receives in DOM mode.
            ref={frameRef as Ref<PixiContainer>}
            x={offset.dx}
            y={offset.dy}
            zIndex={zIndex}
            eventMode="static"
            filters={[dropShadow]}
            onPointerDown={onPointerDown}
            layout={{
                flexDirection: 'column',
                minWidth: config.minWidth,
                minHeight: config.minHeight,
                width: config.minWidth,
                height: config.minHeight,
                ...config.layout,
                ...layout,
                ...(size && { width: size.width, height: size.height }),
            }}
        >
            <BackgroundLayer layer={resolvedLayer} tintColor={resolvedTint} />
            <BackgroundLayer layer={resolvedOverlay} />
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