import { Container as PixiContainer } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';
import { ComponentType, ReactNode, Ref } from 'react';

import { GetPixelRatio } from '#base/utils';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { ContentArea } from './ContentArea';
import { Header, HeaderProps } from './Header';
import { useFrameDrag, useFrameResize, useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { Scaler, ScalerDirection, ScalerProps } from './Scaler';
import { compose, ThemeProps } from './utils';

/**
 * What a frame's view receives. A view lays out the window chrome - header/title, close
 * button, scaler and the content area - the way the Flash skin template did (`frame_3`,
 * `illumina_light_frame`, ...); `Frame` supplies the art layers, dragging, resizing and the
 * variant cascade around it. The generated `windowmanager/templates/*FrameLayout` components
 * implement this contract; which one a variant uses comes from the element-view registry
 * (`habbo_element_description_xml`: `frame` style 3 -> `habbo_window_layout_frame_3`), a
 * variant's own `view`, or the `view` prop.
 */
export interface FrameViewProps {
    caption?: string;
    tintColor?: string;
    resizeDirection?: ScalerDirection;
    onClose?: () => void;
    /** The header/titlebar's pointer-down - starts a window drag. */
    onHeaderPointerDown?: HeaderProps['onPointerDown'];
    /** The scaler's pointer-down - starts a window resize. */
    onScalerPointerDown?: ScalerProps['onPointerDown'];
    layout?: BoxLayout;
    children?: ReactNode;
}

export type FrameView = ComponentType<FrameViewProps>;

import { FRAME_VARIANTS, FrameVariant } from './variants/frame';

export interface FrameProps extends ThemeProps<FrameVariant> {
    id?: string;
    caption?: string;
    resizeDirection?: ScalerDirection;
    /** Overrides the variant's chrome layout (see `FrameViewProps`); the default comes from the element-view registry. */
    view?: FrameView;
    onClose?: () => void;
    children?: ReactNode;
}

const dropShadow = new DropShadowFilter({ offset: { x: 2.83, y: 2.83 }, blur: 4, color: 0x000000, alpha: 0.349, resolution: GetPixelRatio() });

export const Frame = ({
    id, variant, defaultVariant = '3', caption, tintColor, layout, resizeDirection = 'all', view, onClose, children,
    onPointerOver, onPointerOut, onPointerDown: onPointerDownProp, onPointerUp, onPointerUpOutside, onPointerTap,
}: FrameProps) => {
    const { frameRef, offset, zIndex, onPointerDown, onHeaderPointerDown } = useFrameDrag(id);
    const { ownCascade, handlers, resolvedLayer, resolvedOverlay, resolvedTint, view: variantView } = useThemeVariant({
        cascadeKey: 'frame', variants: FRAME_VARIANTS, variant, defaultVariant, tintColor,
        onPointerOver, onPointerOut, onPointerDown: compose(onPointerDown, onPointerDownProp), onPointerUp, onPointerUpOutside, onPointerTap,
    });
    // The view's template carries the skin's own minimum; the caller's layout (a ported
    // window's `width_min`/`height_min`) bounds interactive resizing.
    const minWidth = layout?.minWidth ?? 20;
    const minHeight = layout?.minHeight ?? 20;
    const maxWidth = layout?.maxWidth;
    const maxHeight = layout?.maxHeight;
    const { size, onScalerPointerDown } = useFrameResize(
        id,
        frameRef,
        resizeDirection,
        { width: minWidth as number, height: minHeight as number },
        { width: typeof maxWidth === 'number' ? maxWidth : undefined, height: typeof maxHeight === 'number' ? maxHeight : undefined },
    );

    const View = view ?? (variantView as FrameView | undefined);

    return (
        <Box
            ref={frameRef as Ref<PixiContainer>}
            x={offset.dx}
            y={offset.dy}
            zIndex={zIndex}
            // A view carries the template's own drop shadow.
            filters={View ? undefined : [ dropShadow ]}
            {...handlers}
            layout={{
                flexDirection: 'column',
                minWidth,
                minHeight,
                width: minWidth,
                height: minHeight,
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
                {View
                    ? (
                            <View
                                caption={caption}
                                tintColor={resolvedTint}
                                resizeDirection={resizeDirection}
                                onClose={onClose}
                                onHeaderPointerDown={onHeaderPointerDown}
                                onScalerPointerDown={onScalerPointerDown}
                                layout={{ width: '100%', height: '100%', flex: 1 }}
                            >
                                {children}
                            </View>
                        )
                    : (
                            <>
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
                            </>
                        )}
            </VariantCascadeProvider>
        </Box>
    );
};

Frame.displayName = 'Frame';
