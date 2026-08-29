import { BoxLayout, Region } from '#base/theme';

import { LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuy, LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuyProps } from './LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuy';

/** Generated from `1714_layout_loyalty_vip_buy_xml` (layout "ctlg_loyalty_vip_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutLoyaltyVipBuy_1714LayoutProps {
    ctlgLoyaltyVipBuy?: LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuyProps;
    layout?: BoxLayout;
}

export const LayoutLoyaltyVipBuy_1714Layout = ({ ctlgLoyaltyVipBuy, layout }: LayoutLoyaltyVipBuy_1714LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuy {...ctlgLoyaltyVipBuy} />
        </Region>
    );
};
