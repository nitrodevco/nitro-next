import { BoxLayout, Region } from '#base/theme';
import { MarketPlaceOwnItemsWidget, MarketPlaceOwnItemsWidgetProps } from '#base/views/layouts/catalog/widgets/MarketPlaceOwnItemsWidget';

/** Generated from `1691_layout_marketplace_own_items_xml` (layout "ctlg_marketplace", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMarketplaceOwnItems_1691LayoutProps {
    ctlgMarketplaceOwnItems?: LayoutMarketplaceOwnItems_1691LayoutCtlgMarketplaceOwnItemsProps;
    layout?: BoxLayout;
}

export const LayoutMarketplaceOwnItems_1691Layout = ({ ctlgMarketplaceOwnItems, layout }: LayoutMarketplaceOwnItems_1691LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutMarketplaceOwnItems_1691LayoutCtlgMarketplaceOwnItems {...ctlgMarketplaceOwnItems} />
        </Region>
    );
};

/** Named region `ctlg_marketplace_own_items` of LayoutMarketplaceOwnItems_1691Layout - configured through the parent's `ctlgMarketplaceOwnItems` prop. */
export interface LayoutMarketplaceOwnItems_1691LayoutCtlgMarketplaceOwnItemsProps {
    layout?: BoxLayout;
    marketPlaceOwnItemsWidget?: MarketPlaceOwnItemsWidgetProps;
}

export const LayoutMarketplaceOwnItems_1691LayoutCtlgMarketplaceOwnItems = ({ layout, marketPlaceOwnItemsWidget }: LayoutMarketplaceOwnItems_1691LayoutCtlgMarketplaceOwnItemsProps) => {
    return (
        <Region
            name="ctlg_marketplace_own_items"
            params={16}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <MarketPlaceOwnItemsWidget
                layout={{ position: 'absolute', left: 10, width: 340, top: 70, height: 390 }}
                {...marketPlaceOwnItemsWidget}
            />
        </Region>
    );
};
