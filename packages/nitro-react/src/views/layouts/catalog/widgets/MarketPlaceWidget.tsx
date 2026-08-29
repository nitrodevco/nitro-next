import { BoxLayout, Region } from '#base/theme';
import { MarketPlaceWidgetLayout, MarketPlaceWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/MarketPlaceWidgetLayout';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `marketPlaceWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutMarketplace_1633Layout); each passes its own placement through `layout`.
 */
export type MarketPlaceWidgetProps = Omit<MarketPlaceWidgetLayoutProps, 'layout'> & CatalogWidgetFlags & { layout?: BoxLayout };

export const MarketPlaceWidget = ({ layout, ...widget }: MarketPlaceWidgetProps) => {
    return (
        <Region
            name="marketPlaceWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <MarketPlaceWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
