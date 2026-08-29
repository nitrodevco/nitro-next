import { BoxLayout, Region } from '#base/theme';
import { AddOnBadgeViewWidgetLayout, AddOnBadgeViewWidgetLayoutProps } from '#base/views/layouts/catalog/AddOnBadgeViewWidgetLayout';

/**
 * Catalog widget `addOnBadgeViewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 2 pages
 * (LayoutSingleBundle_1587Layout, LayoutSingleBundle_1643Layout); each passes its own placement through `layout`.
 */
export type AddOnBadgeViewWidget2Props = Omit<AddOnBadgeViewWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const AddOnBadgeViewWidget2 = ({ layout, ...widget }: AddOnBadgeViewWidget2Props) => {
    return (
        <Region
            name="addOnBadgeViewWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <AddOnBadgeViewWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
