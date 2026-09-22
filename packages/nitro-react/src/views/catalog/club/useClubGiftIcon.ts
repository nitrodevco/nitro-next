/**
 * The icon a club gift's product container draws - `ProductContainer.initProductIcon` into an
 * `image` bitmap (`setIconImage` centres it): the product's own icon for a single or multi offer
 * (`Product.initIcon`), `ctlg_pic_deal_icon_narrow` for a bundle (`BundleProductContainer`). A multi
 * offer also shows its `multiContainer` with `x<count>` (`MultiProductContainer.initProductIcon`);
 * every other container keeps it hidden (`ProductGridItem.set view`).
 */
import { CatalogPricingModelEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';

import { LayoutImage } from '#base/theme';
import { getOfferProduct } from '#base/utils';

/** `BundleProductContainer`'s icon. */
const BUNDLE_ICON = LayoutImage('catalog/ctlg_pic_deal_icon_narrow.png');

export const useClubGiftIcon = (offer: IPurchasableOffer) => {
    const product = getOfferProduct(offer);
    const isBundle = (offer.pricingModel === CatalogPricingModelEnum.Bundle);
    const isMulti = (offer.pricingModel === CatalogPricingModelEnum.Multi);

    return {
        /** The bundle's picture, or `undefined` when the product draws its own icon (`CatalogProductIconView`). */
        bundleIcon: isBundle ? BUNDLE_ICON : undefined,
        product: isBundle ? undefined : product,
        multiCount: (isMulti && product) ? product.productCount : undefined,
    };
};
