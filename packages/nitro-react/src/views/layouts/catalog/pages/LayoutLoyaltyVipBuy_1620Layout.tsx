import { BoxLayout, Region } from '#base/theme';
import { LoyaltyVipBuyWidget2, LoyaltyVipBuyWidget2Props } from '#base/views/layouts/catalog/widgets/LoyaltyVipBuyWidget2';

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

/** Named region `ctlg_loyalty_vip_buy` of LayoutLoyaltyVipBuy_1620Layout - configured through the parent's `ctlgLoyaltyVipBuy` prop. */
export interface LayoutLoyaltyVipBuy_1620LayoutCtlgLoyaltyVipBuyProps {
    layout?: BoxLayout;
    loyaltyVipBuyWidget?: LoyaltyVipBuyWidget2Props;
    tags?: string[];
}

export const LayoutLoyaltyVipBuy_1620LayoutCtlgLoyaltyVipBuy = ({ layout, loyaltyVipBuyWidget, tags }: LayoutLoyaltyVipBuy_1620LayoutCtlgLoyaltyVipBuyProps) => {
    return (
        <Region
            name="ctlg_loyalty_vip_buy"
            tags={tags}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <LoyaltyVipBuyWidget2
                tags={[ 'EMBEDDED' ]}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                {...loyaltyVipBuyWidget}
            />
        </Region>
    );
};
