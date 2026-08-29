import { BoxLayout, Region } from '#base/theme';
import { ProductViewWidgetLayout, ProductViewWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/ProductViewWidgetLayout';

/**
 * Catalog widget `productViewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 8 pages
 * (LayoutBadgeDisplay_1641Layout, LayoutBadgeDisplay_1669Layout, LayoutDefault_1595Layout, LayoutDefault_1725Layout, LayoutGuildCustomFurni_1586Layout, LayoutGuildCustomFurni_1680Layout, …); each passes its own placement through `layout`.
 */
export type ProductViewWidgetProps = Omit<ProductViewWidgetLayoutProps, 'layout' | 'tags'> & { layout?: BoxLayout; tags?: string[] };

export const ProductViewWidget = ({ layout, tags, ...widget }: ProductViewWidgetProps) => {
    return (
        <Region
            name="productViewWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <ProductViewWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
