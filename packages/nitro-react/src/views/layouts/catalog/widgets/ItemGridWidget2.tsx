import { BoxLayout, Region } from '#base/theme';
import { ItemGridWidgetLayout, ItemGridWidgetLayoutProps } from '#base/views/layouts/catalog/ItemGridWidgetLayout';

/**
 * Catalog widget `itemGridWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 3 pages
 * (LayoutBadgeDisplay_1669Layout, LayoutPetcustomization_1656Layout, LayoutSoundmachine_1627Layout); each passes its own placement through `layout`.
 */
export type ItemGridWidget2Props = Omit<ItemGridWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const ItemGridWidget2 = ({ layout, ...widget }: ItemGridWidget2Props) => {
    return (
        <Region
            name="itemGridWidget"
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
