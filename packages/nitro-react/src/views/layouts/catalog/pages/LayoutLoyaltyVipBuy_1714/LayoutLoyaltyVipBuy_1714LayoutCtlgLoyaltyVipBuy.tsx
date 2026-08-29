import { BoxLayout, Region } from '#base/theme';
import { LoyaltyVipBuyWidget2, LoyaltyVipBuyWidget2Props } from '#base/views/layouts/catalog/widgets/LoyaltyVipBuyWidget2';

/** Named region `ctlg_loyalty_vip_buy` of LayoutLoyaltyVipBuy_1714Layout - configured through the parent's `ctlgLoyaltyVipBuy` prop. */
export interface LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuyProps {
    layout?: BoxLayout;
    loyaltyVipBuyWidget?: LoyaltyVipBuyWidget2Props;
}

export const LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuy = ({ layout, loyaltyVipBuyWidget }: LayoutLoyaltyVipBuy_1714LayoutCtlgLoyaltyVipBuyProps) => {
    return (
        <Region
            name="ctlg_loyalty_vip_buy"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <LoyaltyVipBuyWidget2
                layout={{ position: 'absolute', left: 13, width: 320, top: 67, height: 345 }}
                {...loyaltyVipBuyWidget}
            />
        </Region>
    );
};
