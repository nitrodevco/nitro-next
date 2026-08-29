import { BoxLayout, Region } from '#base/theme';
import { SoldLtdItemsWidgetLayout, SoldLtdItemsWidgetLayoutProps } from '#base/views/layouts/catalog/SoldLtdItemsWidgetLayout';

/**
 * Catalog widget `soldLtdItemsWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1725Layout); each passes its own placement through `layout`.
 */
export type SoldLtdItemsWidget2Props = Omit<SoldLtdItemsWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const SoldLtdItemsWidget2 = ({ layout, ...widget }: SoldLtdItemsWidget2Props) => {
    return (
        <Region
            name="soldLtdItemsWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <SoldLtdItemsWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
