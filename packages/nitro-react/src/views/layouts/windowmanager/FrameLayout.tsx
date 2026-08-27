import { BoxLayout, Header, Region, Scaler } from '#base/theme';

/** Generated from `2754_frame_xml` (layout "habbo_window_layout_frame", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FrameLayoutProps {
    layout?: BoxLayout;
}

export const FrameLayout = ({ layout }: FrameLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 }}
            layout={{ position: 'relative', width: 40, height: 40, ...layout }}
        >
            <Header
                name="titlebar"
                tags={[ '_HEADER', '_EXCLUDE', '_INTERNAL', '_COLORIZE' ]}
                params={2147484049}
                layout={{ position: 'absolute', left: 6, right: 6, top: 6, height: 15 }}
            />
            <Region
                name="content_area"
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                params={12585104}
                layout={{ position: 'absolute', left: 6, right: 6, top: 25, bottom: 7 }}
            />
            <Scaler
                name="_FRAME_SCALER"
                tags={[ '_SCALER', '_EXCLUDE', '_INTERNAL', '_COLORIZE' ]}
                params={1136}
                layout={{ position: 'absolute', right: 0, width: 15, bottom: 0, height: 15 }}
            />
        </Region>
    );
};
