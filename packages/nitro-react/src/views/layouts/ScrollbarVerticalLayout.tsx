import { BoxLayout, Region } from '#base/theme';

/** Generated from `2795_scrollbar_vertical_xml` (layout "habbo_window_layout_scrollbar_vertical", 17x56) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ScrollbarVerticalLayoutProps {
    layout?: BoxLayout;
}

export const ScrollbarVerticalLayout = ({ layout }: ScrollbarVerticalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 17, height: 56, ...layout }} />
    );
};
