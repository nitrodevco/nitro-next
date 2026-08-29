import { ReactNode } from 'react';

import { BoxLayout, ContentArea, FramePointerDown, Header, HeaderProps, Region, Scaler, ScalerDirection, ScalerProps } from '#base/theme';

/** Generated from `2814_frame_7_xml` (layout "habbo_window_layout_frame_7", 64x73) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Frame7LayoutProps {
    caption?: string;
    children?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onHeaderPointerDown?: HeaderProps['onPointerDown'];
    onScalerPointerDown?: ScalerProps['onPointerDown'];
    resizeDirection?: ScalerDirection;
    tintColor?: string;
}

export const Frame7Layout = ({ caption, children, layout, onClose, onHeaderPointerDown, onScalerPointerDown, resizeDirection, tintColor }: Frame7LayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 }}
            layout={{ position: 'relative', minWidth: 64, minHeight: 73, ...layout }}
        >
            <Header
                name="titlebar"
                caption={caption}
                tintColor={tintColor}
                onClose={onClose}
                onPointerDown={onHeaderPointerDown}
                layout={{ position: 'absolute', left: 6, right: 8, top: 6, height: 27 }}
            />
            <ContentArea
                name="content_area"
                layout={{ position: 'absolute', left: 3, right: 3, top: 36, bottom: 12 }}
            >
                {children}
            </ContentArea>
            <Scaler
                name="_FRAME_SCALER"
                direction={resizeDirection}
                onPointerDown={onScalerPointerDown}
                layout={{ position: 'absolute', right: 3, width: 20, bottom: 13, height: 20 }}
            />
            <FramePointerDown
                name="pointer"
                layout={{ position: 'absolute', marginLeft: 4, marginRight: -4, width: 16, bottom: 2, height: 12 }}
            />
        </Region>
    );
};
