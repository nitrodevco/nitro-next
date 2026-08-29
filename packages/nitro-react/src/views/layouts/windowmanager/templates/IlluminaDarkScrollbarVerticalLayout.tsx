import { BoxLayout, Region, ScrollbarSliderTrackVertical } from '#base/theme';

/** Generated from `2666_illumina_dark_scrollbar_vertical_xml` (layout "illumina_dark_window_layout_scrollbar_vertical", 9x9) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaDarkScrollbarVerticalLayoutProps {
    layout?: BoxLayout;
}

export const IlluminaDarkScrollbarVerticalLayout = ({ layout }: IlluminaDarkScrollbarVerticalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 9, height: 9, ...layout }}>
            <ScrollbarSliderTrackVertical
                name="slider_track"
                layout={{ position: 'absolute', left: 0, width: 9, top: 0, bottom: 0 }}
            />
        </Region>
    );
};
