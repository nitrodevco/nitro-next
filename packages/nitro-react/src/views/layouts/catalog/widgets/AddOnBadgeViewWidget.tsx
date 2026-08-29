import { BoxLayout, Region } from '#base/theme';
import { AddOnBadgeViewWidgetLayout, AddOnBadgeViewWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/AddOnBadgeViewWidgetLayout';

/**
 * Catalog widget `addOnBadgeViewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 4 pages
 * (LayoutSingleBundle_1587Layout, LayoutSingleBundle_1643Layout, NewPetsWidget, PetsWidget); each passes its own placement through `layout`.
 */
export type AddOnBadgeViewWidgetProps = Omit<AddOnBadgeViewWidgetLayoutProps, 'layout' | 'tags'> & { layout?: BoxLayout; tags?: string[] };

export const AddOnBadgeViewWidget = ({ layout, tags, ...widget }: AddOnBadgeViewWidgetProps) => {
    return (
        <Region
            name="addOnBadgeViewWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <AddOnBadgeViewWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
