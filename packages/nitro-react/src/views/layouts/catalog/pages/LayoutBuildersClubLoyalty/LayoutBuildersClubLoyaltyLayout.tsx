import { BoxLayout, Region } from '#base/theme';

import { LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyalty, LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyaltyProps } from './LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyalty';

/** Generated from `1617_layout_builders_club_loyalty_xml` (layout "layout_builders_club_loyalty", 360x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBuildersClubLoyaltyLayoutProps {
    ctlgBuildersClubLoyalty?: LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyaltyProps;
    layout?: BoxLayout;
}

export const LayoutBuildersClubLoyaltyLayout = ({ ctlgBuildersClubLoyalty, layout }: LayoutBuildersClubLoyaltyLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 508, ...layout }}>
            <LayoutBuildersClubLoyaltyLayoutCtlgBuildersClubLoyalty {...ctlgBuildersClubLoyalty} />
        </Region>
    );
};
