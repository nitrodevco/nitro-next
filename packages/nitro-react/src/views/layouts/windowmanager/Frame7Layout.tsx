import { BoxLayout, Region } from '#base/theme';

/** Generated from `2814_frame_7_xml` (layout "habbo_window_layout_frame_7", 64x73) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Frame7LayoutProps {
    layout?: BoxLayout;
}

export const Frame7Layout = ({ layout }: Frame7LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 64, height: 73, ...layout }}>
            <Region
                name="content_area"
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                layout={{ position: 'absolute', left: 3, width: 58, top: 36, height: 25 }}
            />
        </Region>
    );
};
