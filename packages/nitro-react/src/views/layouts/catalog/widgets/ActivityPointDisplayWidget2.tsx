import { BoxLayout, Region } from '#base/theme';
import { ActivityPointDisplayWidgetLayout, ActivityPointDisplayWidgetLayoutProps } from '#base/views/layouts/catalog/ActivityPointDisplayWidgetLayout';

/**
 * Catalog widget `activityPointDisplayWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 3 pages
 * (LayoutGuildCustomFurni_1586Layout, LayoutGuildCustomFurni_1680Layout, LayoutSpacesNew_1657Layout); each passes its own placement through `layout`.
 */
export type ActivityPointDisplayWidget2Props = Omit<ActivityPointDisplayWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const ActivityPointDisplayWidget2 = ({ layout, ...widget }: ActivityPointDisplayWidget2Props) => {
    return (
        <Region
            name="activityPointDisplayWidget"
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <ActivityPointDisplayWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
