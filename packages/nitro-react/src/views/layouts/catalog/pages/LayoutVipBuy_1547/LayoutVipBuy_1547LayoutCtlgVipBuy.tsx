import { BoxLayout, Region } from '#base/theme';
import { VipBuyWidget, VipBuyWidgetProps } from '#base/views/layouts/catalog/widgets/VipBuyWidget';

/** Named region `ctlg_vip_buy` of LayoutVipBuy_1547Layout - configured through the parent's `ctlgVipBuy` prop. */
export interface LayoutVipBuy_1547LayoutCtlgVipBuyProps {
    layout?: BoxLayout;
    vipBuyWidget?: VipBuyWidgetProps;
}

export const LayoutVipBuy_1547LayoutCtlgVipBuy = ({ layout, vipBuyWidget }: LayoutVipBuy_1547LayoutCtlgVipBuyProps) => {
    return (
        <Region
            name="ctlg_vip_buy"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <VipBuyWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...vipBuyWidget}
            />
        </Region>
    );
};
