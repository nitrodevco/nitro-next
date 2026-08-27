import { BoxLayout, Region } from '#base/theme';

/** Generated from `1991_frame_3_xml` (layout "habbo_window_layout_frame_3", 64x64) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Frame3LayoutProps {
    layout?: BoxLayout;
}

export const Frame3Layout = ({ layout }: Frame3LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 64, height: 64, ...layout }}>
            <Region
                name="content_area"
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                layout={{ position: 'absolute', left: 3, width: 58, top: 36, height: 25 }}
            />
        </Region>
    );
};
