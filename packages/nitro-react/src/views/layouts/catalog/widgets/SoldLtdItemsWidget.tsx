import { BoxLayout, Region } from '#base/theme';
import { SoldLtdItemsWidgetLayout, SoldLtdItemsWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/SoldLtdItemsWidgetLayout';

/**
 * Catalog widget `soldLtdItemsWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 2 pages
 * (LayoutDefault_1595Layout, LayoutDefault_1725Layout); each passes its own placement through `layout`.
 */
export type SoldLtdItemsWidgetProps = Omit<SoldLtdItemsWidgetLayoutProps, 'layout' | 'tags'> & { layout?: BoxLayout; tags?: string[] };

export const SoldLtdItemsWidget = ({ layout, tags, ...widget }: SoldLtdItemsWidgetProps) => {
    return (
        <Region
            name="soldLtdItemsWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <SoldLtdItemsWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
