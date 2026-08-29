import { BoxLayout, Region } from '#base/theme';
import { ProductViewWidgetLayout, ProductViewWidgetLayoutProps } from '#base/views/layouts/catalog/ProductViewWidgetLayout';

/**
 * Catalog widget `productViewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 2 pages
 * (LayoutSpacesNew_1576Layout, LayoutSpacesNew_1657Layout); each passes its own placement through `layout`.
 */
export type ProductViewWidget2Props = Omit<ProductViewWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const ProductViewWidget2 = ({ layout, ...widget }: ProductViewWidget2Props) => {
    return (
        <Region
            name="productViewWidget"
            tags={[ 'NO_ROOM_CANVAS' ]}
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <ProductViewWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
