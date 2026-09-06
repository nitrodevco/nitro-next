import { Container as PixiContainer } from 'pixi.js';
import { ReactNode, Ref } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { ContentArea } from './ContentArea';
import { Header } from './Header';
import { useFrameDrag, useFrameResize, useThemeVariant } from './hooks';
import { BackgroundLayer, Composite, CompositePiece, NineSlice, ShadowLayer } from './layer';
import { Scaler, ScalerDirection } from './Scaler';
import { compose, ThemeProps, ThemeVariant, ThemeVariants } from './utils';

export type FrameVariant = ThemeVariant;

const BLUE_FRAME_SHINE = Composite([
    CompositePiece('frame-0-default-shine-top-left-src', 1, 1, undefined, undefined, 7, 7),
    CompositePiece('frame-0-default-shine-top-center-src', 2, 8, 8, undefined, undefined, 1),
    CompositePiece('frame-0-default-shine-top-right-src', 1, undefined, 1, undefined, 7, 7),
    CompositePiece('frame-0-default-shine-top-center-src', 8, 2, undefined, 8, 1),
    CompositePiece('frame-0-default-shine-top-center-src', 8, undefined, 2, 7, 1),
    CompositePiece('frame-0-default-shine-bottom-left-src', undefined, 1, undefined, 1, 7, 7),
    CompositePiece('frame-0-default-shine-top-center-src', undefined, 8, 7, 2, undefined, 1),
    CompositePiece('frame-0-default-shine-bottom-right-src', undefined, undefined, 1, 1, 6, 6),
]);

const FRAME_3_SHINE = NineSlice('frame-3-default-shine-src', 10, 33, 10, 10);

const FRAME_0_VARIANT: FrameVariant = {
    layer: NineSlice('frame-0-default-src', 13, 13, 13, 13),
    overlay: BLUE_FRAME_SHINE,
    dropShadow: { distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 },
    layout: {
        minWidth: 40,
        minHeight: 50,
        paddingTop: 2,
        paddingBottom: 2,
    },
};

const FRAME_UBUNTU_VARIANT: FrameVariant = {
    layer: NineSlice('frame-3-default-src', 10, 33, 10, 10),
    overlay: FRAME_3_SHINE,
    dropShadow: { distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 },
    layout: {
        minWidth: 64,
        minHeight: 64,
    },
};

const FRAME_VARIANTS: ThemeVariants<FrameVariant> = {
    // blue
    0: {
        ...FRAME_0_VARIANT,
        tintColor: '#418db0',
    },
    // black
    1: {
        ...FRAME_0_VARIANT,
        tintColor: '#4c4c4c',
    },
    // yellow
    2: {
        ...FRAME_0_VARIANT,
        tintColor: '#fac200',
    },
    // ubuntu
    3: {
        ...FRAME_UBUNTU_VARIANT,
        tintColor: '#418db0',
    },
    4: {
        ...FRAME_UBUNTU_VARIANT,
        tintColor: '#67a3bf',
    },
    7: {
        ...FRAME_UBUNTU_VARIANT,
    },
    100: {
        layer: Composite([
            CompositePiece('border-101-default-top-left-src', 0, 0, undefined, undefined, 4, 4),
            CompositePiece('border-101-default-top-center-src', 0, 4, 4, undefined, undefined, 4),
            CompositePiece('border-101-default-top-right-src', 0, undefined, 0, undefined, 4, 4),
            CompositePiece('border-101-default-center-left-src', 4, 0, undefined, 7, 1),
            CompositePiece('border-101-default-center-center-src', 4, 1, 1, 7),
            CompositePiece('border-101-default-center-left-src', 4, undefined, 0, 7, 1),
            CompositePiece('border-101-default-bottom-left-src', undefined, 0, undefined, 0, 4, 7),
            CompositePiece('border-101-default-bottom-center-src', undefined, 4, 4, 0, undefined, 7),
            CompositePiece('border-101-default-bottom-right-src', undefined, undefined, 0, 0, 4, 7),
        ]),
        layout: {
            minWidth: 50,
            minHeight: 50,
        },
    },
    // illumina "wired" - the light frame art with the wired window layout
    102: {
        layer: Composite([
            CompositePiece('border-101-default-top-left-src', 0, 0, undefined, undefined, 4, 4),
            CompositePiece('border-101-default-top-center-src', 0, 4, 4, undefined, undefined, 4),
            CompositePiece('border-101-default-top-right-src', 0, undefined, 0, undefined, 4, 4),
            CompositePiece('border-101-default-center-left-src', 4, 0, undefined, 7, 1),
            CompositePiece('border-101-default-center-center-src', 4, 1, 1, 7),
            CompositePiece('border-101-default-center-left-src', 4, undefined, 0, 7, 1),
            CompositePiece('border-101-default-bottom-left-src', undefined, 0, undefined, 0, 4, 7),
            CompositePiece('border-101-default-bottom-center-src', undefined, 4, 4, 0, undefined, 7),
            CompositePiece('border-101-default-bottom-right-src', undefined, undefined, 0, 0, 4, 7),
        ]),
        layout: {
            minWidth: 50,
            minHeight: 50,
        },
    },
    // illumina purple
    103: {
        layer: NineSlice('frame-103-default-src', 4, 4, 4, 7),
        layout: {
            minWidth: 50,
            minHeight: 50,
        },
    },
    200: {
        layer: NineSlice('frame-200-default-src', 4, 4, 4, 5),
        layout: {
            minWidth: 50,
            minHeight: 50,
        },
    },
    // leaderboard "total badges" - a huge fixed-art frame (193x130 sheet, 96/87/96/42 slices)
    10000: {
        layer: NineSlice('frame-10000-default-src', 96, 87, 96, 42),
        layout: {
            minWidth: 200,
            minHeight: 140,
        },
    },
};

export interface FrameProps extends ThemeProps<FrameVariant> {
    id?: string;
    caption?: string;
    resizeDirection?: ScalerDirection;
    contentLayout?: BoxLayout;
    onClose?: () => void;
    children?: ReactNode;
}

export const Frame = ({
    variant, defaultVariant, layout, tintColor, textStyle, textColor, id, caption, resizeDirection = 'all', contentLayout, onClose, children,
    onPointerOver, onPointerOut, onPointerDown: onPointerDownProp, onPointerUp, onPointerUpOutside, onPointerTap,
}: FrameProps) => {
    const { frameRef, offset, zIndex, onPointerDown, onHeaderPointerDown } = useFrameDrag(id);
    const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedShadow, resolvedTint } = useThemeVariant({
        cascadeKey: 'frame', variants: FRAME_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown: compose(onPointerDown, onPointerDownProp), onPointerUp, onPointerUpOutside, onPointerTap,
    });
    const minWidth = layout?.minWidth ?? config.layout?.minWidth ?? 20;
    const minHeight = layout?.minHeight ?? config.layout?.minHeight ?? 20;
    const maxWidth = layout?.maxWidth ?? config.layout?.maxWidth;
    const maxHeight = layout?.maxHeight ?? config.layout?.maxHeight;
    const { size, onScalerPointerDown } = useFrameResize(
        id,
        frameRef,
        resizeDirection,
        { width: minWidth as number, height: minHeight as number },
        { width: typeof maxWidth === 'number' ? maxWidth : undefined, height: typeof maxHeight === 'number' ? maxHeight : undefined },
    );

    return (
        <Box
            ref={frameRef as Ref<PixiContainer>}
            x={offset.dx}
            y={offset.dy}
            zIndex={zIndex}
            {...handlers}
            layout={{
                flexDirection: 'column',
                minWidth,
                minHeight,
                width: minWidth,
                height: minHeight,
                ...config.layout,
                ...layout,
                ...(size && { width: size.width, height: size.height }),
            }}
        >
            { resolvedShadow && <ShadowLayer {...resolvedShadow} /> }
            { resolvedLayer && (
                <BackgroundLayer
                    layer={resolvedLayer}
                    tintColor={resolvedTint}
                />
            ) }
            { resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} /> }
            <VariantCascadeProvider map={ownCascade}>
                <Header
                    caption={caption}
                    tintColor={resolvedTint}
                    onClose={onClose}
                    onPointerDown={onHeaderPointerDown}
                />
                <ContentArea layout={contentLayout}>
                    {children}
                </ContentArea>
                <Scaler
                    direction={resizeDirection}
                    onPointerDown={onScalerPointerDown}
                />
            </VariantCascadeProvider>
        </Box>
    );
};

Frame.displayName = 'Frame';
