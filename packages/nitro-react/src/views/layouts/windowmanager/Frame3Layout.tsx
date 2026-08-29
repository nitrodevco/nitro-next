import { BoxLayout, Header, Region, Scaler } from '#base/theme';

/** Generated from `1991_frame_3_xml` (layout "habbo_window_layout_frame_3", 64x64) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Frame3LayoutProps {
    contentArea?: Frame3LayoutContentAreaProps;
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
                tags={[ '_HEADER', '_EXCLUDE', '_INTERNAL', '_COLORIZE' ]}
                params={2147484049}
                layout={{ position: 'absolute', left: 6, right: 8, top: 6, height: 27 }}
            />
            <Frame3LayoutContentArea {...contentArea} />
            <Scaler
                name="_FRAME_SCALER"
                tags={[ '_SCALER', '_EXCLUDE', '_INTERNAL', '_COLORIZE' ]}
                params={1136}
                layout={{ position: 'absolute', right: 3, width: 20, bottom: 4, height: 20 }}
            />
        </Region>
    );
};

/** Named region `content_area` of Frame3Layout - configured through the parent's `contentArea` prop. */
export interface Frame3LayoutContentAreaProps {
    layout?: BoxLayout;
}

export const Frame3LayoutContentArea = ({ layout }: Frame3LayoutContentAreaProps) => {
    return (
        <Region
            name="content_area"
            tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
            params={12585104}
            layout={{ position: 'absolute', left: 3, right: 3, top: 36, bottom: 3, ...layout }}
        />
    );
};
