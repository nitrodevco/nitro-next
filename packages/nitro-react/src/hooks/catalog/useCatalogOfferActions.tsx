import { CatalogPricingModelEnum, CatalogPricingTypeEnum, CatalogTypeEnum, FurnitureTypeEnum, ICatalogOffer, IProduct, IPurchasableOffer } from "@nitrodevco/nitro-api";

import { useCatalogSelectors, useFurnitureDataSelector } from "#base/context";

export const useCatalogOfferActions = () => {
    const { catalogType } = useCatalogSelectors();
    const { floorItems, wallItems, productData } = useFurnitureDataSelector();

    const getFurnitureData = (classId: number, productType: FurnitureTypeEnum) => {
        switch (productType) {
            case FurnitureTypeEnum.Floor:
                return floorItems[classId];
            case FurnitureTypeEnum.Wall:
                return wallItems[classId];
        }

        return undefined;
    }

    const stripAddonProducts = (products: IProduct[]) => {
        if (products.length === 1) return products;

        return products.filter(product => ((product.productType !== FurnitureTypeEnum.Badge) && (product.productType !== FurnitureTypeEnum.Effect) && (product.classId !== 108)));
    }

    const getPricingModelForProducts = (products: IProduct[]) => {
        const stripped = stripAddonProducts(products);

        if (stripped.length === 1) return stripped[0].productCount === 1 ? CatalogPricingModelEnum.Single : CatalogPricingModelEnum.Multi;

        if (stripped.length > 1) return CatalogPricingModelEnum.Bundle;

        return CatalogPricingModelEnum.Unknown;
    }

    const getPricingTypeForOffer = (offer: ICatalogOffer) => {
        if (offer.costCredits > 0 && offer.costCurrency > 0) return CatalogPricingTypeEnum.CreditsActivityPoints;

        if (offer.costCredits > 0) return CatalogPricingTypeEnum.Credits;

        if (offer.costCurrency > 0) return CatalogPricingTypeEnum.ActivityPoints;

        return CatalogPricingTypeEnum.None;
    }

    const getOfferProduct = (offer: IPurchasableOffer) => {
        if (!offer.products.length) return undefined;

        if (offer.products.length === 1) return offer.products[0];

        return stripAddonProducts(offer.products)?.[0] ?? undefined;
    }

    const processOffer = (offer: ICatalogOffer) => {
        if (!offer || !offer.products.length) return undefined;

        const pData = productData[offer.localizationId];
        const products: IProduct[] = [];

        let badgeCode: string | undefined = undefined;

        for (const product of offer.products) {
            const furnitureData = getFurnitureData(product.spriteId, product.productType);

            if (!furnitureData) continue;

            products.push({
                productType: product.productType,
                classId: product.spriteId,
                extraParam: product.extraParam,
                productCount: product.quantity,
                productData: pData,
                furnitureData,
                isUnique: product.isUnique,
                uniqueSize: product.uniqueSize,
                uniqueLeft: product.uniqueRemaining
            });

            if (product.productType === FurnitureTypeEnum.Badge) badgeCode = product.extraParam;
        }

        const purchasableOffer = {
            pricingModel: getPricingModelForProducts(products),
            pricingType: getPricingTypeForOffer(offer),
            offerId: offer.id,
            localizationId: offer.localizationId,
            priceInCredits: offer.costCredits,
            priceInActivityPoints: offer.costCurrency,
            activityPointType: offer.costCurrencyType,
            giftable: offer.canGift,
            isRentOffer: offer.rentable,
            clubLevel: offer.clubLevel,
            products,
            bundlePurchaseAllowed: offer.canBundle,
            isLazy: false,
            page: undefined,
            badgeCode: badgeCode
        } as IPurchasableOffer;

        if (!(catalogType == CatalogTypeEnum.Normal || (purchasableOffer.pricingModel !== CatalogPricingModelEnum.Bundle && purchasableOffer.pricingModel !== CatalogPricingModelEnum.Multi))) return undefined;

        return purchasableOffer;
    }

    return { getOfferProduct, processOffer };
}