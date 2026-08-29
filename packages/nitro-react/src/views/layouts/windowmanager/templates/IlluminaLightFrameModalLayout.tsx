import { ReactNode } from 'react';

import { Border, BoxLayout, CloseButton, ContentArea, HeaderProps, Region, Scaler, ScalerDirection, ScalerProps, ThemeText } from '#base/theme';

/** Generated from `2792_illumina_light_frame_modal_xml` (layout "illumina_light_frame_modal", 50x80) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightFrameModalLayoutProps {
    caption?: string;
    children?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onHeaderPointerDown?: HeaderProps['onPointerDown'];
    onScalerPointerDown?: ScalerProps['onPointerDown'];
    resizeDirection?: ScalerDirection;
}

export const IlluminaLightFrameModalLayout = ({ caption, children, layout, onClose, onHeaderPointerDown, onScalerPointerDown, resizeDirection }: IlluminaLightFrameModalLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 0, angle: 0, color: '#000000', alpha: 0.75, blur: 80 }}
            layout={{ position: 'relative', minWidth: 50, minHeight: 80, ...layout }}
        >
            <Border
                variant="101"
                layout={{ position: 'absolute', left: 0, right: 0, top: 40, bottom: 0 }}
            />
            <ContentArea
                name="content_area"
                layout={{ position: 'absolute', left: 1, right: 1, top: 70, bottom: -9 }}
            >
                {children}
            </ContentArea>
            <Region
                name="titlebar"
                onPointerDown={onHeaderPointerDown}
                layout={{ position: 'absolute', left: 0, right: 0, top: 40, height: 30 }}
            />
            <Region
                name="header_title_text"
                layout={{ position: 'absolute', left: 8, width: 20, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={caption ?? ''}
                    textStyle="text-style-il-frame-modal-title"
                />
            </Region>
            <CloseButton
                variant="100"
                name="header_button_close"
                onPointerTap={onClose}
                layout={{ position: 'absolute', right: 8, width: 20, top: 49, height: 20 }}
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
