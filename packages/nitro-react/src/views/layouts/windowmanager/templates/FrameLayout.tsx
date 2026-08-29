import { BoxLayout, Header, Region, Scaler } from '#base/theme';

/** Generated from `2754_frame_xml` (layout "habbo_window_layout_frame", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FrameLayoutProps {
    contentArea?: FrameLayoutContentAreaProps;
    layout?: BoxLayout;
}

export const FrameLayout = ({ contentArea, layout }: FrameLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 }}
            layout={{ position: 'relative', width: 40, height: 40, ...layout }}
        >
            <Header
                name="titlebar"
                layout={{ position: 'absolute', left: 6, right: 6, top: 6, height: 15 }}
            />
            <FrameLayoutContentArea {...contentArea} />
            <Scaler
                name="_FRAME_SCALER"
                layout={{ position: 'absolute', right: 0, width: 15, bottom: 0, height: 15 }}
            />
        </Region>
    );
};

/** Named region `content_area` of FrameLayout - configured through the parent's `contentArea` prop. */
export interface FrameLayoutContentAreaProps {
    layout?: BoxLayout;
}

export const FrameLayoutContentArea = ({ layout }: FrameLayoutContentAreaProps) => {
    return (
        <Region
            name="content_area"
            layout={{ position: 'absolute', left: 6, right: 6, top: 25, bottom: 7, ...layout }}
        />
    );
};
