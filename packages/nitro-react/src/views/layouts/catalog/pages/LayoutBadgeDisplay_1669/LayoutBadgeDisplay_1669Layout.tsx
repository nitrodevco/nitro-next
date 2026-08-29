import { BoxLayout, Region } from '#base/theme';

import { LayoutBadgeDisplay_1669LayoutCtlgBadgedisplay, LayoutBadgeDisplay_1669LayoutCtlgBadgedisplayProps } from './LayoutBadgeDisplay_1669LayoutCtlgBadgedisplay';

/** Generated from `1669_layout_badge_display_xml` (layout "ctlg_badge_display", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBadgeDisplay_1669LayoutProps {
    ctlgBadgedisplay?: LayoutBadgeDisplay_1669LayoutCtlgBadgedisplayProps;
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1669Layout = ({ ctlgBadgedisplay, layout }: LayoutBadgeDisplay_1669LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutBadgeDisplay_1669LayoutCtlgBadgedisplay {...ctlgBadgedisplay} />
        </Region>
    );
};
