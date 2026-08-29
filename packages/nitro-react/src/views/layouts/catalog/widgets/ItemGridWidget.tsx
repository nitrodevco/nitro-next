import { BoxLayout, Region } from '#base/theme';
import { ItemGridWidgetLayout, ItemGridWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/ItemGridWidgetLayout';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `itemGridWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 10 pages
 * (LayoutBadgeDisplay_1641Layout, LayoutBadgeDisplay_1669Layout, LayoutDefault_1595Layout, LayoutDefault_1725Layout, LayoutGuildCustomFurni_1586Layout, LayoutGuildCustomFurni_1680Layout, …); each passes its own placement through `layout`.
 */
export type ItemGridWidgetProps = Omit<ItemGridWidgetLayoutProps, 'layout'> & CatalogWidgetFlags & { layout?: BoxLayout };

export const ItemGridWidget = ({ layout, ...widget }: ItemGridWidgetProps) => {
    return (
        <Region
            name="itemGridWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ItemGridWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
