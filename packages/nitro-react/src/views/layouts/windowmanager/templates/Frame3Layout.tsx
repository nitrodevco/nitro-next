import { ReactNode } from 'react';

import { BoxLayout, ContentArea, Header, HeaderProps, Region, Scaler, ScalerDirection, ScalerProps } from '#base/theme';

/** Generated from `1991_frame_3_xml` (layout "habbo_window_layout_frame_3", 64x64) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Frame3LayoutProps {
    caption?: string;
    children?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onHeaderPointerDown?: HeaderProps['onPointerDown'];
    onScalerPointerDown?: ScalerProps['onPointerDown'];
    resizeDirection?: ScalerDirection;
    tintColor?: string;
}

export const Frame3Layout = ({ caption, children, layout, onClose, onHeaderPointerDown, onScalerPointerDown, resizeDirection, tintColor }: Frame3LayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 }}
            layout={{ position: 'relative', minWidth: 64, minHeight: 64, ...layout }}
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
                layout={{ position: 'absolute', left: 3, right: 3, top: 36, bottom: 3 }}
            >
                {children}
            </ContentArea>
            <Scaler
                name="_FRAME_SCALER"
                direction={resizeDirection}
                onPointerDown={onScalerPointerDown}
                layout={{ position: 'absolute', right: 3, width: 20, bottom: 4, height: 20 }}
            />
        </Region>
    );
};
