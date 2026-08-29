import { BoxLayout, Region } from '#base/theme';

import { LayoutVipBuy_1547LayoutCtlgVipBuy, LayoutVipBuy_1547LayoutCtlgVipBuyProps } from './LayoutVipBuy_1547LayoutCtlgVipBuy';

/** Generated from `1547_layout_vip_buy_xml` (layout "ctlg_vip_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutVipBuy_1547LayoutProps {
    ctlgVipBuy?: LayoutVipBuy_1547LayoutCtlgVipBuyProps;
    layout?: BoxLayout;
}

export const LayoutVipBuy_1547Layout = ({ ctlgVipBuy, layout }: LayoutVipBuy_1547LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutVipBuy_1547LayoutCtlgVipBuy {...ctlgVipBuy} />
        </Region>
    );
};
