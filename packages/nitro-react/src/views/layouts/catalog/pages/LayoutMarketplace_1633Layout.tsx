import { BoxLayout, Region } from '#base/theme';
import { MarketPlaceWidget, MarketPlaceWidgetProps } from '#base/views/layouts/catalog/widgets/MarketPlaceWidget';

/** Generated from `1633_layout_marketplace_xml` (layout "ctlg_marketplace", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMarketplace_1633LayoutProps {
    layout?: BoxLayout;
    marketPlaceWidget?: MarketPlaceWidgetProps;
}

export const LayoutMarketplace_1633Layout = ({ layout, marketPlaceWidget }: LayoutMarketplace_1633LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_marketplace"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <MarketPlaceWidget
                    layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 390 }}
                    {...marketPlaceWidget}
                />
            </Region>
        </Region>
    );
};
