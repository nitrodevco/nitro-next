import { BoxLayout, Region, ScrollbarSliderTrackHorizontal } from '#base/theme';

/** Generated from `2535_illumina_dark_scrollbar_horizontal_xml` (layout "illumina_dark_window_layout_scrollbar_horizontal", 9x9) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaDarkScrollbarHorizontalLayoutProps {
    layout?: BoxLayout;
}

export const IlluminaDarkScrollbarHorizontalLayout = ({ layout }: IlluminaDarkScrollbarHorizontalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 9, height: 9, ...layout }}>
            <ScrollbarSliderTrackHorizontal layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 9 }} />
        </Region>
    );
};
