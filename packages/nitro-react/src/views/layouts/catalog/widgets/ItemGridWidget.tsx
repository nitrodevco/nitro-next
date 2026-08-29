import { BoxLayout, Region } from '#base/theme';
import { ItemGridWidgetLayout, ItemGridWidgetLayoutProps } from '#base/views/layouts/catalog/ItemGridWidgetLayout';

/**
 * Catalog widget `itemGridWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 4 pages
 * (LayoutBadgeDisplay_1641Layout, LayoutDefault_1725Layout, LayoutPetcustomization_1713Layout, LayoutSoundmachine_1654Layout); each passes its own placement through `layout`.
 */
export type ItemGridWidgetProps = Omit<ItemGridWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const ItemGridWidget = ({ layout, ...widget }: ItemGridWidgetProps) => {
    return (
        <Region
            name="itemGridWidget"
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <ItemGridWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
