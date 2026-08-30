import { BoxLayout, Region } from '#base/theme';
import { VipBuyWidget2, VipBuyWidget2Props } from '#base/views/layouts/catalog/widgets/VipBuyWidget2';

/** Named region `ctlg_vip_buy` of LayoutVipBuy_1585Layout - configured through the parent's `ctlgVipBuy` prop. */
export interface LayoutVipBuy_1585LayoutCtlgVipBuyProps {
    layout?: BoxLayout;
    vipBuyWidget?: VipBuyWidget2Props;
}

export const LayoutVipBuy_1585LayoutCtlgVipBuy = ({ layout, vipBuyWidget }: LayoutVipBuy_1585LayoutCtlgVipBuyProps) => {
    return (
        <Region
            name="ctlg_vip_buy"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <VipBuyWidget2
                layout={{ position: 'absolute', left: 10, width: 340, top: 80, height: 380 }}
                {...vipBuyWidget}
            />
        </Region>
    );
};
