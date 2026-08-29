import { BoxLayout, Region, ScrollbarSliderButtonDown, ScrollbarSliderButtonUp, ScrollbarSliderTrackVertical } from '#base/theme';

/** Generated from `2795_scrollbar_vertical_xml` (layout "habbo_window_layout_scrollbar_vertical", 17x56) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ScrollbarVerticalLayoutProps {
    layout?: BoxLayout;
}

export const ScrollbarVerticalLayout = ({ layout }: ScrollbarVerticalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 17, height: 56, ...layout }}>
            <ScrollbarSliderButtonUp layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 16 }} />
            <ScrollbarSliderTrackVertical
                name="slider_track"
                tags={[ '_EXCLUDE', '_INTERNAL', 'slider_track' ]}
                layout={{ position: 'absolute', left: 0, width: 17, top: 16, bottom: 16 }}
            />
            <ScrollbarSliderButtonDown layout={{ position: 'absolute', left: 0, width: 17, bottom: 0, height: 16 }} />
        </Region>
    );
};
