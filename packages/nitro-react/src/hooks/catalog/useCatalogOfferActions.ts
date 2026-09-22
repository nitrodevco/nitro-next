import { ICatalogOffer, IFurnitureData } from '@nitrodevco/nitro-api';

import { useCatalogStore } from '#base/context/catalog';
import { useSystemStore } from '#base/context/system';
import { getOfferProduct, processCatalogOffer, processFurnitureAsOffer } from '#base/utils';

/**
 * The offer builders of `utils/catalogOffers` bound to the window's catalogue type and the loaded
 * furniture and product data, for the views that build offers (the search) or read an offer's
 * product.
 */
export const useCatalogOfferActions = () => {
    const catalogType = useCatalogStore(x => x.catalogType);
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const productData = useSystemStore(x => x.productData);
    const lookup = { floorItems, wallItems, productData };

    const processOffer = (offer: ICatalogOffer) => processCatalogOffer(offer, catalogType, lookup);
    const processAsOffer = (furnitureData: IFurnitureData) => processFurnitureAsOffer(furnitureData, lookup);

    return { getOfferProduct, processOffer, processAsOffer };
};
