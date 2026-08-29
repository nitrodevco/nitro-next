import { BoxLayout, Region } from '#base/theme';
import { RecyclerWidgetLayout, RecyclerWidgetLayoutProps } from '#base/views/layouts/catalog/RecyclerWidgetLayout';

/**
 * Catalog widget `recyclerWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutRecycler_1712Layout); each passes its own placement through `layout`.
 */
export type RecyclerWidgetProps = Omit<RecyclerWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const RecyclerWidget = ({ layout, ...widget }: RecyclerWidgetProps) => {
    return (
        <Region
            name="recyclerWidget"
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <RecyclerWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
