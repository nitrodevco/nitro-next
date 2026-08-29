import { BoxLayout, Region } from '#base/theme';
import { TotalPriceWidgetLayout, TotalPriceWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/TotalPriceWidgetLayout';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `totalPriceWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1725Layout); each passes its own placement through `layout`.
 */
export type TotalPriceWidget2Props = Omit<TotalPriceWidgetLayoutProps, 'layout'> & CatalogWidgetFlags & { layout?: BoxLayout };

export const TotalPriceWidget2 = ({ layout, ...widget }: TotalPriceWidget2Props) => {
    return (
        <Region
            name="totalPriceWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <TotalPriceWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
