import { ReactNode } from 'react';

import { BoxLayout, ContentArea, Header, HeaderProps, Region, Scaler, ScalerDirection, ScalerProps } from '#base/theme';

/** Generated from `2754_frame_xml` (layout "habbo_window_layout_frame", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FrameLayoutProps {
    caption?: string;
    children?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onHeaderPointerDown?: HeaderProps['onPointerDown'];
    onScalerPointerDown?: ScalerProps['onPointerDown'];
    resizeDirection?: ScalerDirection;
    tintColor?: string;
}

export const FrameLayout = ({ caption, children, layout, onClose, onHeaderPointerDown, onScalerPointerDown, resizeDirection, tintColor }: FrameLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 }}
            layout={{ position: 'relative', minWidth: 40, minHeight: 40, ...layout }}
        >
            <Header
                name="titlebar"
                caption={caption}
                tintColor={tintColor}
                onClose={onClose}
                onPointerDown={onHeaderPointerDown}
                layout={{ position: 'absolute', left: 6, right: 6, top: 6, height: 15 }}
            />
            <ContentArea
                name="content_area"
                layout={{ position: 'absolute', left: 6, right: 6, top: 25, bottom: 7 }}
            >
                {children}
            </ContentArea>
            <Scaler
                name="_FRAME_SCALER"
                direction={resizeDirection}
                onPointerDown={onScalerPointerDown}
                layout={{ position: 'absolute', right: 0, width: 15, bottom: 0, height: 15 }}
            />
        </Region>
    );
};
