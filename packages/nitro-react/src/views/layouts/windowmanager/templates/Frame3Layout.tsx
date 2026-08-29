import { ReactNode } from 'react';

import { BoxLayout, Header, Region, Scaler } from '#base/theme';

/** Generated from `1991_frame_3_xml` (layout "habbo_window_layout_frame_3", 64x64) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Frame3LayoutProps {
    contentArea?: ReactNode;
    layout?: BoxLayout;
}

export const Frame3Layout = ({ contentArea, layout }: Frame3LayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 }}
            layout={{ position: 'relative', width: 64, height: 64, ...layout }}
        >
            <Header
                name="titlebar"
                layout={{ position: 'absolute', left: 6, right: 8, top: 6, height: 27 }}
            />
            <Region
                name="content_area"
                layout={{ position: 'absolute', left: 3, right: 3, top: 36, bottom: 3 }}
            >
                {contentArea}
            </Region>
            <Scaler
                name="_FRAME_SCALER"
                layout={{ position: 'absolute', right: 3, width: 20, bottom: 4, height: 20 }}
            />
        </Region>
    );
};
