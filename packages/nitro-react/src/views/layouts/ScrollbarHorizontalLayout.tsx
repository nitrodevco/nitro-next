import { BoxLayout, Region } from '#base/theme';

/** Generated from `2683_scrollbar_horizontal_xml` (layout "habbo_window_layout_scrollbar_horizontal", 56x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ScrollbarHorizontalLayoutProps {
    layout?: BoxLayout;
}

export const ScrollbarHorizontalLayout = ({ layout }: ScrollbarHorizontalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 56, height: 17, ...layout }} />
    );
};
