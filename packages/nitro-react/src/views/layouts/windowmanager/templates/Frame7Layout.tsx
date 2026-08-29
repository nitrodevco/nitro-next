import { BoxLayout, FramePointerDown, Header, Region, Scaler } from '#base/theme';

/** Generated from `2814_frame_7_xml` (layout "habbo_window_layout_frame_7", 64x73) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Frame7LayoutProps {
    contentArea?: Frame7LayoutContentAreaProps;
    layout?: BoxLayout;
}

export const Frame7Layout = ({ contentArea, layout }: Frame7LayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 }}
            layout={{ position: 'relative', width: 64, height: 73, ...layout }}
        >
            <Header
                name="titlebar"
                tags={[ '_HEADER', '_EXCLUDE', '_INTERNAL', '_COLORIZE' ]}
                layout={{ position: 'absolute', left: 6, right: 8, top: 6, height: 27 }}
            />
            <Frame7LayoutContentArea
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                {...contentArea}
            />
            <Scaler
                name="_FRAME_SCALER"
                tags={[ '_SCALER', '_EXCLUDE', '_INTERNAL', '_COLORIZE' ]}
                layout={{ position: 'absolute', right: 3, width: 20, bottom: 13, height: 20 }}
            />
            <FramePointerDown
                name="pointer"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE' ]}
                layout={{ position: 'absolute', marginLeft: 4, marginRight: -4, width: 16, bottom: 2, height: 12 }}
            />
        </Region>
    );
};

/** Named region `content_area` of Frame7Layout - configured through the parent's `contentArea` prop. */
export interface Frame7LayoutContentAreaProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const Frame7LayoutContentArea = ({ layout, tags }: Frame7LayoutContentAreaProps) => {
    return (
        <Region
            name="content_area"
            tags={tags}
            layout={{ position: 'absolute', left: 3, right: 3, top: 36, bottom: 12, ...layout }}
        />
    );
};
