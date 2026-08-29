import { BoxLayout, Region } from '#base/theme';
import { ItemGridWidgetLayout, ItemGridWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/ItemGridWidgetLayout';

/**
 * Catalog widget `itemGridWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 10 pages
 * (LayoutBadgeDisplay_1641Layout, LayoutBadgeDisplay_1669Layout, LayoutDefault_1595Layout, LayoutDefault_1725Layout, LayoutGuildCustomFurni_1586Layout, LayoutGuildCustomFurni_1680Layout, …); each passes its own placement through `layout`.
 */
export type ItemGridWidgetProps = Omit<ItemGridWidgetLayoutProps, 'layout' | 'tags'> & { layout?: BoxLayout; tags?: string[] };

export const ItemGridWidget = ({ layout, tags, ...widget }: ItemGridWidgetProps) => {
    return (
        <Region
            name="itemGridWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <ItemGridWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
