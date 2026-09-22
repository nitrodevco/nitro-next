import { FurnitureTypeEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Border, InfiniteGrid, Region } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CatalogBundleGridItemView } from './CatalogBundleGridItemView';

/**
 * The products of the page's bundle, the embedded `bundleGridScrollWidget` of
 * `layout_single_bundle.xml` - Flash's `BundleGridViewCatalogWidget`: the container is itself a
 * style 6 border, and its `bundleGrid` (`scrollable_itemgrid_vertical`, 4,3 in, no spacing) gets a
 * bare 36x36 grid item per product of the selected offer, badges left out (`populateItemGrid`).
 *
 * `WIDGETS_INITIALIZED` selects the page's offer when it has exactly one (the page has no item
 * grid to do it), and every `SELECT_PRODUCT` refills the grid.

 * Every other product has a cell with its icon (`Product.initIcon`, `CatalogProductIconView`) -
 * furni, effects, bots, chat styles and the rest.
 */
export const CatalogBundleGridScrollWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ offer, setOffer ] = useState<IPurchasableOffer | undefined>(undefined);

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, event => setOffer(event.offer));

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.WIDGETS_INITIALIZED, () => {
        if (page.offers.length === 1) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SELECT_PRODUCT, offer: page.offers[0] });
    });

    const cells = offer ? offer.products.filter(product => (product.productType !== FurnitureTypeEnum.Badge)).map((product, index) => ({ product, index })) : [];

    return (
        <Border
            variant="6"
            name="bundleGridScrollWidget"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        >
            <Region
                name="bundleGrid"
                layout={{ position: 'absolute', left: 4, right: 4, top: 3, bottom: 6, flexDirection: 'column' }}
            >
                <InfiniteGrid
                    items={cells}
                    itemGrid={{ width: 36, height: 36, spacing: 0 }}
                    scrollResetKey={offer}
                    getKey={cell => cell.index}
                    itemRender={cell => <CatalogBundleGridItemView product={cell.product} />}
                />
            </Region>
        </Border>
    );
};
