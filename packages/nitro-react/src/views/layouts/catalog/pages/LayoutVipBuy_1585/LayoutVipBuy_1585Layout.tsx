import { BoxLayout, Region } from '#base/theme';

import { LayoutVipBuy_1585LayoutCtlgVipBuy, LayoutVipBuy_1585LayoutCtlgVipBuyProps } from './LayoutVipBuy_1585LayoutCtlgVipBuy';

/** Generated from `1585_layout_vip_buy_xml` (layout "ctlg_vip_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutVipBuy_1585LayoutProps {
    ctlgVipBuy?: LayoutVipBuy_1585LayoutCtlgVipBuyProps;
    layout?: BoxLayout;
}

export const LayoutVipBuy_1585Layout = ({ ctlgVipBuy, layout }: LayoutVipBuy_1585LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutVipBuy_1585LayoutCtlgVipBuy {...ctlgVipBuy} />
        </Region>
    );
};
