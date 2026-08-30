import { Container as PixiContainer } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';
import { ReactNode, Ref } from 'react';

import { GetPixelRatio } from '#base/utils';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { ContentArea } from './ContentArea';
import { Header } from './Header';
import { useFrameDrag, useFrameResize, useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { Scaler, ScalerDirection } from './Scaler';
import { compose, ThemeProps } from './utils';
import { FRAME_VARIANTS, FrameVariant } from './variants/frame';

export interface FrameProps extends ThemeProps<FrameVariant> {
    id?: string;
    caption?: string;
    resizeDirection?: ScalerDirection;
    onClose?: () => void;
    children?: ReactNode;
}

const dropShadow = new DropShadowFilter({ offset: { x: 2.83, y: 2.83 }, blur: 4, color: 0x000000, alpha: 0.349, resolution: GetPixelRatio() });

export const Frame = ({
    id, variant, defaultVariant = '3', caption, tintColor, layout, resizeDirection = 'all', onClose, children,
    onPointerOver, onPointerOut, onPointerDown: onPointerDownProp, onPointerUp, onPointerUpOutside, onPointerTap,
}: FrameProps) => {
    const { frameRef, offset, zIndex, onPointerDown, onHeaderPointerDown } = useFrameDrag(id);
    const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
        cascadeKey: 'frame', variants: FRAME_VARIANTS, variant, defaultVariant, tintColor,
        onPointerOver, onPointerOut, onPointerDown: compose(onPointerDown, onPointerDownProp), onPointerUp, onPointerUpOutside, onPointerTap,
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
            filters={[ dropShadow ]}
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
                <ContentArea>
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
