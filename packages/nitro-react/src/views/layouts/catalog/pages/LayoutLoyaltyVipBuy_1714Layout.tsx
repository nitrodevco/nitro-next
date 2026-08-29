import { BoxLayout, Region } from '#base/theme';
import { LoyaltyVipBuyWidget, LoyaltyVipBuyWidgetProps } from '#base/views/layouts/catalog/widgets/LoyaltyVipBuyWidget';

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

/** Named region `ctlg_loyalty_vip_buy` of LayoutLoyaltyVipBuy_1714Layout - configured through the parent's `ctlgLoyaltyVipBuy` prop. */
export interface LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuyProps {
    layout?: BoxLayout;
    loyaltyVipBuyWidget?: LoyaltyVipBuyWidgetProps;
    tags?: string[];
}

export const LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuy = ({ layout, loyaltyVipBuyWidget, tags }: LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuyProps) => {
    return (
        <Region
            name="ctlg_loyalty_vip_buy"
            tags={tags}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <LoyaltyVipBuyWidget
                layout={{ position: 'absolute', left: 13, width: 320, top: 67, height: 345 }}
                {...loyaltyVipBuyWidget}
            />
        </Region>
    );
};
