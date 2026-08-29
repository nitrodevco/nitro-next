import { BoxLayout, Region } from '#base/theme';
import { MarketPlaceOwnItemsWidgetLayout, MarketPlaceOwnItemsWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/MarketPlaceOwnItemsWidgetLayout';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `marketPlaceOwnItemsWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutMarketplaceOwnItems_1691Layout); each passes its own placement through `layout`.
 */
export type MarketPlaceOwnItemsWidget2Props = Omit<MarketPlaceOwnItemsWidgetLayoutProps, 'layout'> & CatalogWidgetFlags & { layout?: BoxLayout };

export const MarketPlaceOwnItemsWidget2 = ({ layout, ...widget }: MarketPlaceOwnItemsWidget2Props) => {
    return (
        <Region
            name="marketPlaceOwnItemsWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <MarketPlaceOwnItemsWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
