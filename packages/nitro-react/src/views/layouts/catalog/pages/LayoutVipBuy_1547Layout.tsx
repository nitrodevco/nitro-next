import { BoxLayout, Region } from '#base/theme';
import { VipBuyWidget, VipBuyWidgetProps } from '#base/views/layouts/catalog/widgets/VipBuyWidget';

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

/** Named region `ctlg_vip_buy` of LayoutVipBuy_1547Layout - configured through the parent's `ctlgVipBuy` prop. */
export interface LayoutVipBuy_1547LayoutCtlgVipBuyProps {
    layout?: BoxLayout;
    tags?: string[];
    vipBuyWidget?: VipBuyWidgetProps;
}

export const LayoutVipBuy_1547LayoutCtlgVipBuy = ({ layout, tags, vipBuyWidget }: LayoutVipBuy_1547LayoutCtlgVipBuyProps) => {
    return (
        <Region
            name="ctlg_vip_buy"
            tags={tags}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <VipBuyWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                {...vipBuyWidget}
            />
        </Region>
    );
};
