import { BoxLayout, Region } from '#base/theme';
import { LoyaltyVipBuyWidget, LoyaltyVipBuyWidgetProps } from '#base/views/layouts/catalog/widgets/LoyaltyVipBuyWidget';

/** Named region `ctlg_loyalty_vip_buy` of LayoutLoyaltyVipBuy_1620Layout - configured through the parent's `ctlgLoyaltyVipBuy` prop. */
export interface LayoutLoyaltyVipBuy_1620LayoutCtlgLoyaltyVipBuyProps {
    layout?: BoxLayout;
    loyaltyVipBuyWidget?: LoyaltyVipBuyWidgetProps;
}

export const LayoutLoyaltyVipBuy_1620LayoutCtlgLoyaltyVipBuy = ({ layout, loyaltyVipBuyWidget }: LayoutLoyaltyVipBuy_1620LayoutCtlgLoyaltyVipBuyProps) => {
    return (
        <Region
            name="ctlg_loyalty_vip_buy"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <LoyaltyVipBuyWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...loyaltyVipBuyWidget}
            />
        </Region>
    );
};
