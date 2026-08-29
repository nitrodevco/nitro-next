import { BoxLayout, Region, ScrollbarSliderTrackHorizontal } from '#base/theme';

/** Generated from `2626_illumina_light_scrollbar_horizontal_xml` (layout "illumina_light_window_layout_scrollbar_horizontal", 9x9) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightScrollbarHorizontalLayoutProps {
    layout?: BoxLayout;
}

export const IlluminaLightScrollbarHorizontalLayout = ({ layout }: IlluminaLightScrollbarHorizontalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 9, height: 9, ...layout }}>
            <ScrollbarSliderTrackHorizontal layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} />
        </Region>
    );
};
