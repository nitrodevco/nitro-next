import { BoxLayout, Region } from '#base/theme';
import { VipBuyWidget, VipBuyWidgetProps } from '#base/views/layouts/catalog/widgets/VipBuyWidget';

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

/** Named region `ctlg_vip_buy` of LayoutVipBuy_1585Layout - configured through the parent's `ctlgVipBuy` prop. */
export interface LayoutVipBuy_1585LayoutCtlgVipBuyProps {
    layout?: BoxLayout;
    vipBuyWidget?: VipBuyWidgetProps;
}

export const LayoutVipBuy_1585LayoutCtlgVipBuy = ({ layout, vipBuyWidget }: LayoutVipBuy_1585LayoutCtlgVipBuyProps) => {
    return (
        <Region
            name="ctlg_vip_buy"
            params={16}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <VipBuyWidget
                layout={{ position: 'absolute', left: 10, width: 340, top: 80, height: 380 }}
                {...vipBuyWidget}
            />
        </Region>
    );
};
