import { BoxLayout, Region } from '#base/theme';
import { MarketPlaceOwnItemsWidgetLayout, MarketPlaceOwnItemsWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/MarketPlaceOwnItemsWidgetLayout';

/**
 * Catalog widget `marketPlaceOwnItemsWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutMarketplaceOwnItems_1691Layout); each passes its own placement through `layout`.
 */
export type MarketPlaceOwnItemsWidget2Props = Omit<MarketPlaceOwnItemsWidgetLayoutProps, 'layout' | 'tags'> & { layout?: BoxLayout; tags?: string[] };

export const MarketPlaceOwnItemsWidget2 = ({ layout, tags, ...widget }: MarketPlaceOwnItemsWidget2Props) => {
    return (
        <Region
            name="marketPlaceOwnItemsWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <MarketPlaceOwnItemsWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
