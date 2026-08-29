import { ReactNode } from 'react';

import { BoxLayout, CloseButton, ContentArea, HeaderProps, Region, Scaler, ScalerDirection, ScalerProps, ThemeText } from '#base/theme';

/** Generated from `2541_illumina_light_frame_xml` (layout "illumina_light_frame", 50x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightFrameLayoutProps {
    caption?: string;
    children?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onHeaderPointerDown?: HeaderProps['onPointerDown'];
    onScalerPointerDown?: ScalerProps['onPointerDown'];
    resizeDirection?: ScalerDirection;
}

export const IlluminaLightFrameLayout = ({ caption, children, layout, onClose, onHeaderPointerDown, onScalerPointerDown, resizeDirection }: IlluminaLightFrameLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 0, angle: 0, color: '#000000', alpha: 0.35, blur: 20 }}
            layout={{ position: 'relative', minWidth: 50, minHeight: 50, ...layout }}
        >
            <ContentArea
                name="content_area"
                layout={{ position: 'absolute', left: 1, right: 1, top: 30, bottom: 1 }}
            >
                {children}
            </ContentArea>
            <Region
                name="titlebar"
                onPointerDown={onHeaderPointerDown}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
            />
            <Region
                name="header_title_text"
                layout={{ position: 'absolute', left: 8, width: 20, top: 11, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={caption ?? ''}
                    textStyle="text-style-il-frame-title"
                />
            </Region>
            <CloseButton
                variant="100"
                name="header_button_close"
                onPointerTap={onClose}
                layout={{ position: 'absolute', right: 8, width: 20, top: 9, height: 20 }}
            />
            <Scaler
                name="_FRAME_SCALER"
                direction={resizeDirection}
                onPointerDown={onScalerPointerDown}
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 10 }}
            />
        </Region>
    );
};
