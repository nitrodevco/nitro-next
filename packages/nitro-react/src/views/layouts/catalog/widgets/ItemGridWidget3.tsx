import { BoxLayout, Region } from '#base/theme';
import { ItemGridWidgetLayout, ItemGridWidgetLayoutProps } from '#base/views/layouts/catalog/ItemGridWidgetLayout';

/**
 * Catalog widget `itemGridWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 2 pages
 * (LayoutDefault_1595Layout, LayoutGuildCustomFurni_1680Layout); each passes its own placement through `layout`.
 */
export type ItemGridWidget3Props = Omit<ItemGridWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const ItemGridWidget3 = ({ layout, ...widget }: ItemGridWidget3Props) => {
    return (
        <Region
            name="itemGridWidget"
            tags={[ 'E' ]}
            params={2064}
            layout={{ position: 'absolute', ...layout }}
        >
            <ItemGridWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
