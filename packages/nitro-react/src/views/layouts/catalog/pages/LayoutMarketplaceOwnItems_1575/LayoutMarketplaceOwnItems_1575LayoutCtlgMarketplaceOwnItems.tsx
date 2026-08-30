import { BoxLayout, Region } from '#base/theme';
import { MarketPlaceOwnItemsWidget, MarketPlaceOwnItemsWidgetProps } from '#base/views/layouts/catalog/widgets/MarketPlaceOwnItemsWidget/MarketPlaceOwnItemsWidget';

/** Named region `ctlg_marketplace_own_items` of LayoutMarketplaceOwnItems_1575Layout - configured through the parent's `ctlgMarketplaceOwnItems` prop. */
export interface LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItemsProps {
    layout?: BoxLayout;
    marketPlaceOwnItemsWidget?: MarketPlaceOwnItemsWidgetProps;
}

export const LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItems = ({ layout, marketPlaceOwnItemsWidget }: LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItemsProps) => {
    return (
        <Region
            name="ctlg_marketplace_own_items"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <MarketPlaceOwnItemsWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...marketPlaceOwnItemsWidget}
            />
        </Region>
    );
};
