import { BoxLayout, Region } from '#base/theme';

import { LayoutClubBuy_1655LayoutCtlgClubBuy, LayoutClubBuy_1655LayoutCtlgClubBuyProps } from './LayoutClubBuy_1655LayoutCtlgClubBuy';

/** Generated from `1655_layout_club_buy_xml` (layout "ctlg_club_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubBuy_1655LayoutProps {
    ctlgClubBuy?: LayoutClubBuy_1655LayoutCtlgClubBuyProps;
    layout?: BoxLayout;
}

export const LayoutClubBuy_1655Layout = ({ ctlgClubBuy, layout }: LayoutClubBuy_1655LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutClubBuy_1655LayoutCtlgClubBuy {...ctlgClubBuy} />
        </Region>
    );
};
