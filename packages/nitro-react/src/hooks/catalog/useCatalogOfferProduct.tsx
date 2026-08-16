import { IPurchasableOffer } from "@nitrodevco/nitro-api";

import { useCatalogOfferActions } from "./useCatalogOfferActions";

export const useCatalogOfferProduct = (offer: IPurchasableOffer) => {
    const { getOfferProduct } = useCatalogOfferActions();

    return getOfferProduct(offer);
}