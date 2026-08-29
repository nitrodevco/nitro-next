import { BoxLayout, Region } from '#base/theme';
import { ActivityPointDisplayWidgetLayout, ActivityPointDisplayWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/ActivityPointDisplayWidgetLayout';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `activityPointDisplayWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 6 pages
 * (LayoutDefault_1595Layout, LayoutDefault_1725Layout, LayoutGuildCustomFurni_1586Layout, LayoutGuildCustomFurni_1680Layout, LayoutSpacesNew_1576Layout, LayoutSpacesNew_1657Layout); each passes its own placement through `layout`.
 */
export type ActivityPointDisplayWidgetProps = Omit<ActivityPointDisplayWidgetLayoutProps, 'layout'> & CatalogWidgetFlags & { layout?: BoxLayout };

export const ActivityPointDisplayWidget = ({ layout, ...widget }: ActivityPointDisplayWidgetProps) => {
    return (
        <Region
            name="activityPointDisplayWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ActivityPointDisplayWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
