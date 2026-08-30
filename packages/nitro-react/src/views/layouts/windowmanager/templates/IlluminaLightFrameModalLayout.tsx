import { ReactNode } from 'react';

import { Border, BoxLayout, CloseButton, Region, Scaler, ThemeText } from '#base/theme';

/** Generated from `2792_illumina_light_frame_modal_xml` (layout "illumina_light_frame_modal", 50x80) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightFrameModalLayoutProps {
    captionHeaderTitleText?: string;
    contentArea?: ReactNode;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
    onTitlebar?: () => void;
    titlebar?: ReactNode;
}

export const IlluminaLightFrameModalLayout = ({ captionHeaderTitleText, contentArea, layout, onHeaderButtonClose, onTitlebar, titlebar }: IlluminaLightFrameModalLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 0, angle: 0, color: '#000000', alpha: 0.75, blur: 80 }}
            layout={{ position: 'relative', width: 50, height: 80, ...layout }}
        >
            <Border
                variant="101"
                layout={{ position: 'absolute', left: 0, right: 0, top: 40, bottom: 0 }}
            />
            <Region
                name="content_area"
                layout={{ position: 'absolute', left: 1, right: 1, top: 70, bottom: -9 }}
            >
                {contentArea}
            </Region>
            <Region
                name="titlebar"
                onPointerTap={onTitlebar}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 40, height: 30 }}
            >
                {titlebar}
            </Region>
            <ThemeText
                text={captionHeaderTitleText ?? ''}
                textStyle="text-style-il-frame-modal-title"
                name="header_title_text"
                layout={{ position: 'absolute', left: 8, width: 20, top: 0, height: 20 }}
            />
            <CloseButton
                variant="100"
                name="header_button_close"
                onPointerTap={onHeaderButtonClose}
                layout={{ position: 'absolute', right: 8, width: 20, top: 49, height: 20 }}
            />
            <Scaler
                name="_FRAME_SCALER"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 10 }}
            />
        </Region>
    );
};
