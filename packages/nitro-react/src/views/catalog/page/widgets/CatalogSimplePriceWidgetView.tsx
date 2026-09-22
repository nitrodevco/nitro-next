import { CatalogTypeEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { CatalogLayoutName, CatalogWidgetEventEnum, resolveCatalogLayout } from '#base/context/catalog';
import { useCatalogWidgetEvent } from '#base/hooks';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CatalogProductPriceView } from './CatalogProductPriceView';

/** The `fake_productimage` a layout puts inside its `simplePriceWidget` container (x, y, width, height) - only `layout_single_bundle` has one. */
const FAKE_PRODUCT_IMAGES: Partial<Record<CatalogLayoutName, readonly [ number, number, number, number ]>> = {
    single_bundle: [ 0, 0, 83, 30 ],
};

/** `priceDisplayWidget.xml`'s border position, which the box keeps when there is nothing to place it by. */
const PRICE_BOX_X = 12;
const PRICE_BOX_Y = 9;

/**
 * The selected offer's price with nothing else, the `simplePriceWidget` container - Flash's
 * `SimplePriceCatalogWidget`, which calls `HabboCatalogUtils.showPriceOnProduct(offer, window,
 * previous, window.findChildByName("fake_productimage"), 0, true, 0)` on every `SELECT_PRODUCT`.
 *
 * With no `room_canvas_container` in the container the box is placed by `fake_productimage`: its
 * right edge on the image's right edge, its top on the image's top. A layout without that element
 * (`layout_guild_forum`) leaves the box where `priceDisplayWidget.xml` puts it, 12,9 into the
 * container. The builders club shows no price.
 */
export const CatalogSimplePriceWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ offer, setOffer ] = useState<IPurchasableOffer | undefined>(undefined);

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, event => setOffer(event.offer));

    if (!offer || (page.catalogType === CatalogTypeEnum.BuildersClub)) return null;

    const layout = resolveCatalogLayout(page.layoutCode);
    const image = layout ? FAKE_PRODUCT_IMAGES[layout] : undefined;

    return (
        <CatalogProductPriceView
            offer={offer}
            layout={image
                ? { right: 0, top: image[1] }
                : { left: PRICE_BOX_X, top: PRICE_BOX_Y }}
        />
    );
};
