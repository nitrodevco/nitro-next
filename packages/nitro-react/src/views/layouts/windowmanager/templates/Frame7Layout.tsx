import { BoxLayout, FramePointerDown, Header, Region, Scaler } from '#base/theme';

/** Generated from `2814_frame_7_xml` (layout "habbo_window_layout_frame_7", 64x73) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Frame7LayoutProps {
    layout?: BoxLayout;
}

export const Frame7Layout = ({ layout }: Frame7LayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 }}
            layout={{ position: 'relative', width: 64, height: 73, ...layout }}
        >
            <Header
                name="titlebar"
                layout={{ position: 'absolute', left: 6, right: 8, top: 6, height: 27 }}
            />
            <Region
                name="content_area"
                layout={{ position: 'absolute', left: 3, right: 3, top: 36, bottom: 12 }}
            />
            <Scaler
                name="_FRAME_SCALER"
                layout={{ position: 'absolute', right: 3, width: 20, bottom: 13, height: 20 }}
            />
            <FramePointerDown
                name="pointer"
                layout={{ position: 'absolute', marginLeft: 4, marginRight: -4, width: 16, bottom: 2, height: 12 }}
            />
        </Region>
    );
};
