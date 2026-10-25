import { FurnitureTypeEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useCatalogWidgetEvent } from '#base/hooks';
import { useTemplateLibrary } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';
import { bundleProductItem } from './catalogGridItem';

/**
 * The products of the page's bundle, the embedded `bundleGridScrollWidget` of
 * `layout_single_bundle` - Flash's `BundleGridViewCatalogWidget`: its `bundleGrid` gets a clone of
 * the bare `gridItem` per product of the selected offer, badges left out (`populateItemGrid`).
 *
 * `WIDGETS_INITIALIZED` selects the page's offer when it has exactly one (the page has no item
 * grid to do it), and every `SELECT_PRODUCT` refills the grid (`destroyGridItems`).
 */
export const CatalogBundleGridScrollWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ offer, setOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const templates = useTemplateLibrary(CATALOG_LIBRARY);

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, event => setOffer(event.offer));

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.WIDGETS_INITIALIZED, () => {
        if (page.offers.length === 1) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SELECT_PRODUCT, offer: page.offers[0] });
    });

    const products = offer ? offer.products.filter(product => (product.productType !== FurnitureTypeEnum.Badge)) : [];

    useCatalogWidgetView(templates && {
        bindings: {
            bundleGrid: { items: products.map((product, index) => bundleProductItem(product, String(index), templates)) },
        },
    });

    return null;
};
