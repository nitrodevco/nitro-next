import './utils/pixiElements';

import type { ReactNode } from 'react';

import { useCascadedVariant, VARIANT_CASCADE_CONFIG, VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { ContentArea } from './ContentArea';
import { Header } from './Header';
import { Scaler, type ScalerDirection } from './Scaler';
import { useFrameDrag } from './utils/useFrameDrag';
import { useFrameResize } from './utils/useFrameResize';
import { usePixiTexture } from './utils/usePixiTexture';

interface FrameVariant {
    textureKey: string;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    minWidth: number;
    minHeight: number;
}

/**
 * Only the variants used by a migrated view are ported here - see theme/Frame.tsx for the
 * full CSS variant table this mirrors. Add entries as more views migrate.
 */
const FRAME_VARIANTS: Partial<Record<string, FrameVariant>> = {
    '0': { textureKey: 'frame-0-default-src', leftWidth: 13, topHeight: 13, rightWidth: 13, bottomHeight: 13, minWidth: 40, minHeight: 40 },
    '3': { textureKey: 'frame-3-default-src', leftWidth: 10, topHeight: 33, rightWidth: 10, bottomHeight: 10, minWidth: 64, minHeight: 64 },
};

const FRAME_TINT_COLORS: Partial<Record<string, string>> = {
    '0': '#418db0',
    '3': '#418db0',
};

export interface FrameProps {
    /** Identifies this window for z-order stacking (SystemStore) and drag/resize persistence (localStorage). Frames without an id still stack/drag/resize, they just don't persist position/size across reloads. */
    id?: string;
    variant?: string;
    defaultVariant?: string;
    caption?: string;
    tintColor?: string;
    layout?: BoxLayout;
    resizeDirection?: ScalerDirection;
    onClose?: () => void;
    children?: ReactNode;
}

/**
 * Pixi port of theme/Frame.tsx - a draggable, resizable window: nine-slice border/background,
 * Header (caption + close button, drag handle), ContentArea (children), Scaler (resize
 * handle). Reuses the DOM package's variant-cascade system and SystemStore z-order/window
 * registry verbatim (both are pure React context/zustand, no DOM dependency) via
 * useFrameDrag.ts/useFrameResize.ts's Pixi ports of hooks/ui/useFrameDrag.ts/useFrameResize.ts.
 */
export const Frame = ({ id, variant, defaultVariant, caption, tintColor, layout, resizeDirection = 'all', onClose, children }: FrameProps) => {
    const cascadedVariant = useCascadedVariant('frame');
    const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
    const ownCascade = VARIANT_CASCADE_CONFIG['frame']?.[resolvedVariant];
    const config = FRAME_VARIANTS[resolvedVariant] ?? FRAME_VARIANTS['0'];
    const resolvedTint = tintColor || FRAME_TINT_COLORS[resolvedVariant];
    const texture = usePixiTexture(config?.textureKey);

    const { frameRef, offset, zIndex, onPointerDown, onHeaderPointerDown } = useFrameDrag(id);
    const { size, onScalerPointerDown } = useFrameResize(id, frameRef, resizeDirection, { width: config?.minWidth ?? 50, height: config?.minHeight ?? 50 });

    return (
        <Box
            ref={frameRef}
            x={offset.dx}
            y={offset.dy}
            zIndex={zIndex}
            eventMode="static"
            onPointerDown={onPointerDown}
            layout={{
                flexDirection: 'column',
                minWidth: config?.minWidth,
                minHeight: config?.minHeight,
                width: config?.minWidth,
                height: config?.minHeight,
                // The caller's own layout (e.g. an explicit width/height, analogous to the DOM
                // Frame's className w-*/h-* defaults) comes next, then - if the user has
                // actively resized this frame (a stored/dragged size) - that wins for
                // width/height specifically, the same way the DOM version's resize-driven
                // inline style out-specifies its own className defaults.
                ...layout,
                ...(size && { width: size.width, height: size.height }),
            }}
        >
            {(texture && config) && (
                <pixiNineSliceSprite
                    texture={texture}
                    leftWidth={config.leftWidth}
                    topHeight={config.topHeight}
                    rightWidth={config.rightWidth}
                    bottomHeight={config.bottomHeight}
                    tint={resolvedTint}
                    eventMode="none"
                    layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />
            )}
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
