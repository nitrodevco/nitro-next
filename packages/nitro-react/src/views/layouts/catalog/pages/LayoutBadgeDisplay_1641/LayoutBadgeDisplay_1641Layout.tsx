import { BoxLayout, Region } from '#base/theme';

import { LayoutBadgeDisplay_1641LayoutCtlgBadgedisplay, LayoutBadgeDisplay_1641LayoutCtlgBadgedisplayProps } from './LayoutBadgeDisplay_1641LayoutCtlgBadgedisplay';

/** Generated from `1641_layout_badge_display_xml` (layout "ctlg_badge_display", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBadgeDisplay_1641LayoutProps {
    ctlgBadgedisplay?: LayoutBadgeDisplay_1641LayoutCtlgBadgedisplayProps;
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1641Layout = ({ ctlgBadgedisplay, layout }: LayoutBadgeDisplay_1641LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutBadgeDisplay_1641LayoutCtlgBadgedisplay {...ctlgBadgedisplay} />
        </Region>
    );
};
