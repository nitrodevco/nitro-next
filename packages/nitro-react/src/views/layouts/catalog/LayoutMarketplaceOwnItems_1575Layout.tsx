import { BoxLayout, Region } from '#base/theme';
import { MarketPlaceOwnItemsWidget2, MarketPlaceOwnItemsWidget2Props } from '#base/views/layouts/catalog/widgets/MarketPlaceOwnItemsWidget2';

/** Generated from `1575_layout_marketplace_own_items_xml` (layout "ctlg_marketplace", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMarketplaceOwnItems_1575LayoutProps {
    ctlgMarketplaceOwnItems?: LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItemsProps;
    layout?: BoxLayout;
}

export const LayoutMarketplaceOwnItems_1575Layout = ({ ctlgMarketplaceOwnItems, layout }: LayoutMarketplaceOwnItems_1575LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItems {...ctlgMarketplaceOwnItems} />
        </Region>
    );
};

/** Named region `ctlg_marketplace_own_items` of LayoutMarketplaceOwnItems_1575Layout - configured through the parent's `ctlgMarketplaceOwnItems` prop. */
export interface LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItemsProps {
    layout?: BoxLayout;
    marketPlaceOwnItemsWidget?: MarketPlaceOwnItemsWidget2Props;
}

export const LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItems = ({ layout, marketPlaceOwnItemsWidget }: LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItemsProps) => {
    return (
        <Region
            name="ctlg_marketplace_own_items"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <MarketPlaceOwnItemsWidget2
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                {...marketPlaceOwnItemsWidget}
            />
        </Region>
    );
};
