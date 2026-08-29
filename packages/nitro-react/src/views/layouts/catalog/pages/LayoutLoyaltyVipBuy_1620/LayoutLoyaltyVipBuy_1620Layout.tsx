import { BoxLayout, Region } from '#base/theme';

import { LayoutLoyaltyVipBuy_1620LayoutCtlgLoyaltyVipBuy, LayoutLoyaltyVipBuy_1620LayoutCtlgLoyaltyVipBuyProps } from './LayoutLoyaltyVipBuy_1620LayoutCtlgLoyaltyVipBuy';

/** Generated from `1620_layout_loyalty_vip_buy_xml` (layout "ctlg_loyalty_vip_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutLoyaltyVipBuy_1620LayoutProps {
    ctlgLoyaltyVipBuy?: LayoutLoyaltyVipBuy_1620LayoutCtlgLoyaltyVipBuyProps;
    layout?: BoxLayout;
}

export const LayoutLoyaltyVipBuy_1620Layout = ({ ctlgLoyaltyVipBuy, layout }: LayoutLoyaltyVipBuy_1620LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutLoyaltyVipBuy_1620LayoutCtlgLoyaltyVipBuy {...ctlgLoyaltyVipBuy} />
        </Region>
    );
};
