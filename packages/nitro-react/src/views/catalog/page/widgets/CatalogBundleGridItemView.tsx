import { IProduct } from '@nitrodevco/nitro-api';

import { Border, Region, ThemeText } from '#base/theme';

import { CatalogProductIconView } from '../../CatalogProductIconView';

export interface CatalogBundleGridItemViewProps {
    product: IProduct;
}

/**
 * One product of a bundle - the bare 36x36 `gridItem.xml` that `BundleProductContainer.populateItemGrid`
 * and `BundleGridViewCatalogWidget.populateItemGrid` clone per product: its `clubLevelIcon`
 * hidden, the product's icon centred in `image` (`Product.initIcon`), and for a product bought
 * more than once the red `multiContainer` with `x<count>` (`Product.view`). The items are never
 * selected (the bundle's `select` does nothing), so no highlight shows.
 */
export const CatalogBundleGridItemView = ({ product }: CatalogBundleGridItemViewProps) => {
    return (
        <Region layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}>
            <CatalogProductIconView product={product} />
            {(product.productCount > 1) && (
                <Border
                    variant="2"
                    name="multiContainer"
                    tintColor="#ff3300"
                    layout={{ position: 'absolute', left: 18, width: 17, top: 21, height: 13 }}
                >
                    <ThemeText
                        name="multiCounter"
                        text={`x${product.productCount}`}
                        textStyle="regular"
                        textOptions={{ fill: '#cccc66' }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 3, top: 0 }}
                    />
                </Border>
            )}
        </Region>
    );
};
