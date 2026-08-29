import { BoxLayout, Region } from '#base/theme';
import { AddOnBadgeViewWidgetLayout, AddOnBadgeViewWidgetLayoutProps } from '#base/views/layouts/catalog/AddOnBadgeViewWidgetLayout';

/**
 * Catalog widget `addOnBadgeViewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 2 pages
 * (NewPetsWidget, PetsWidget); each passes its own placement through `layout`.
 */
export type AddOnBadgeViewWidgetProps = Omit<AddOnBadgeViewWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const AddOnBadgeViewWidget = ({ layout, ...widget }: AddOnBadgeViewWidgetProps) => {
    return (
        <Region
            name="addOnBadgeViewWidget"
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <AddOnBadgeViewWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
