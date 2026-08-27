import { BoxLayout, Region, ScrollbarSliderTrackVertical } from '#base/theme';

/** Generated from `2749_illumina_light_scrollbar_vertical_xml` (layout "illumina_light_window_layout_scrollbar_vertical", 9x9) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightScrollbarVerticalLayoutProps {
    layout?: BoxLayout;
}

export const IlluminaLightScrollbarVerticalLayout = ({ layout }: IlluminaLightScrollbarVerticalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 9, height: 9, ...layout }}>
            <ScrollbarSliderTrackVertical
                name="slider_track"
                tags={[ '_EXCLUDE', '_INTERNAL', 'slider_track' ]}
                params={2065}
                layout={{ position: 'absolute', left: 0, width: 9, top: 0, bottom: 0 }}
            />
        </Region>
    );
};
