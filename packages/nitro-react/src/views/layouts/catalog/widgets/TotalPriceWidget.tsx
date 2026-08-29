import { BoxLayout, Region } from '#base/theme';
import { TotalPriceWidgetLayout, TotalPriceWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/TotalPriceWidgetLayout';

/**
 * Catalog widget `totalPriceWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1725Layout); each passes its own placement through `layout`.
 */
export type TotalPriceWidgetProps = Omit<TotalPriceWidgetLayoutProps, 'layout' | 'tags'> & { layout?: BoxLayout; tags?: string[] };

export const TotalPriceWidget = ({ layout, tags, ...widget }: TotalPriceWidgetProps) => {
    return (
        <Region
            name="totalPriceWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <TotalPriceWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
