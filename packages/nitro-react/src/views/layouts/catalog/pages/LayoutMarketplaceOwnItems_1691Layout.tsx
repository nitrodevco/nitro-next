import { BoxLayout, Region } from '#base/theme';
import { MarketPlaceOwnItemsWidget, MarketPlaceOwnItemsWidgetProps } from '#base/views/layouts/catalog/widgets/MarketPlaceOwnItemsWidget';

/** Generated from `1691_layout_marketplace_own_items_xml` (layout "ctlg_marketplace", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMarketplaceOwnItems_1691LayoutProps {
    layout?: BoxLayout;
    marketPlaceOwnItemsWidget?: MarketPlaceOwnItemsWidgetProps;
}

export const LayoutMarketplaceOwnItems_1691Layout = ({ layout, marketPlaceOwnItemsWidget }: LayoutMarketplaceOwnItems_1691LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_marketplace_own_items"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <MarketPlaceOwnItemsWidget
                    layout={{ position: 'absolute', left: 10, width: 340, top: 70, height: 390 }}
                    {...marketPlaceOwnItemsWidget}
                />
            </Region>
        </Region>
    );
};
