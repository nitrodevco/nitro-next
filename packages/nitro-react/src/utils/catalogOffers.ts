/**
 * Turning the server's catalogue offers into the offers the pages show - the offer half of Flash's
 * `HabboCatalog.onCatalogPage` / `onProductOffer` (`new Product(...)`, `new Offer(...)`,
 * `isOfferCompatibleWithCatalogType`) and of the search's `FurnitureOffer`, with the pricing rules
 * of `Offer.analyzePricingModel` / `analyzePricingType`.
 *
 * Every product is kept, whatever its type, as Flash's `Product` is: an effect, badge, bot, club,
 * chat style or habbicon product has no furniture data and is drawn from its type and extraParam.
 *
 * Pure: the furniture and product data come in as `CatalogFurnitureLookup`, which the system
 * store's state is, so a packet handler passes `systemStore.getState()` and a hook passes what it
 * selected.
 */
import { CatalogPricingModelEnum, CatalogPricingTypeEnum, CatalogTypeEnum, FurnitureTypeEnum, ICatalogOffer, IFurnitureData, IProduct, IProductData, IPurchasableOffer } from '@nitrodevco/nitro-api';

import type { GameTokensOffer } from '#base/context/game-tokens';

export interface CatalogFurnitureLookup {
    readonly floorItems: Record<number, IFurnitureData>;
    readonly wallItems: Record<number, IFurnitureData>;
    readonly productData: Record<string, IProductData>;
}

const getFurnitureData = (lookup: CatalogFurnitureLookup, classId: number, productType: FurnitureTypeEnum) => {
    switch (productType) {
        case FurnitureTypeEnum.Floor:
            return lookup.floorItems[classId];
        case FurnitureTypeEnum.Wall:
            return lookup.wallItems[classId];
    }

    return undefined;
};

/** `Product.EFFECT_CLASSID_NINJA_DISAPPEAR`: the effect a bundle may carry along as an add-on. */
export const EFFECT_CLASSID_NINJA_DISAPPEAR = 108;

/**
 * `Product.stripAddonProducts`: the products that make the offer, without the badge, the ninja
 * disappear effect and the chat style a bundle carries along.
 */
export const stripAddonProducts = (products: IProduct[]) => {
    if (products.length === 1) return products;

    return products.filter(product => ((product.productType !== FurnitureTypeEnum.Badge) && !((product.productType === FurnitureTypeEnum.Effect) && (product.classId === EFFECT_CLASSID_NINJA_DISAPPEAR)) && (product.productType !== FurnitureTypeEnum.ChatStyle)));
};

/** `Offer`'s constructor: one chat style, alone or with a badge. */
const isSingleChatStyle = (products: IProduct[]) => (((products.length === 1) && (products[0].productType === FurnitureTypeEnum.ChatStyle))
    || ((products.length === 2) && (((products[0].productType === FurnitureTypeEnum.ChatStyle) && (products[1].productType === FurnitureTypeEnum.Badge)) || ((products[0].productType === FurnitureTypeEnum.Badge) && (products[1].productType === FurnitureTypeEnum.ChatStyle)))));

/** `Offer.analyzePricingModel`. */
const getPricingModelForProducts = (products: IProduct[], singleChatStyle: boolean) => {
    if (singleChatStyle) return CatalogPricingModelEnum.Single;

    const stripped = stripAddonProducts(products);

    if (stripped.length === 1) return stripped[0].productCount === 1 ? CatalogPricingModelEnum.Single : CatalogPricingModelEnum.Multi;

    if (stripped.length > 1) return CatalogPricingModelEnum.Bundle;

    return CatalogPricingModelEnum.Unknown;
};

/** `Offer.analyzePriceType`. */
const getPricingTypeForOffer = (offer: ICatalogOffer) => {
    if (offer.costCredits > 0 && offer.costCurrency > 0) return CatalogPricingTypeEnum.CreditsActivityPoints;

    if (offer.costCredits > 0) return CatalogPricingTypeEnum.Credits;

    if (offer.costCurrency > 0) return CatalogPricingTypeEnum.ActivityPoints;

    if (offer.costSilver > 0) return CatalogPricingTypeEnum.Silver;

    return CatalogPricingTypeEnum.None;
};

/** `HabboCatalog.getProductCountOverride`: the two wired storage bundles whose storage furni counts five. */
const getProductCountOverride = (localizationId: string, furnitureData: IFurnitureData | undefined, productCount: number) => {
    if ((localizationId === 'wf_storage_furni_bd') && (furnitureData?.className === 'wf_storage_furni1')) return 5;

    if ((localizationId === 'wf_storage_coins_bd') && (furnitureData?.className === 'wf_storage_coins2')) return 5;

    return productCount;
};

/** `HabboCatalogUtils.buildersClub`: a Builders Club offer, which may come with no products. */
export const isBuildersClubLocalization = (localizationId: string) => ((localizationId.indexOf('builders_club') === 0) || (localizationId.indexOf('loyalty_bc') === 0));

/**
 * `ProductContainer.firstProduct` (what `Offer.product` returns): the one product an offer is
 * about - its only one, the one beside a badge, or the first once the add-ons are stripped.
 */
export const getOfferProduct = (offer: IPurchasableOffer): IProduct | undefined => {
    const products = offer.products;

    if (!products.length) return undefined;

    if (products.length === 1) return products[0];

    if ((products.length === 2) && ((products[1].productType === FurnitureTypeEnum.Badge) || (products[0].productType === FurnitureTypeEnum.Badge))) return (products[0].productType === FurnitureTypeEnum.Badge) ? products[1] : products[0];

    return stripAddonProducts(products)[0];
};

/**
 * An offer of `CatalogPageMessage` / `ProductOfferMessage` as a page offer - `HabboCatalog.onCatalogPage`:
 * every product becomes a `Product` whatever its type (furniture data only where the furni data
 * knows the class), an offer with no products is dropped unless it is a Builders Club one, and a
 * bundle or multi offer outside the normal catalogue is dropped (`isOfferCompatibleWithCatalogType`).
 */
export const processCatalogOffer = (offer: ICatalogOffer, catalogType: CatalogTypeEnum, lookup: CatalogFurnitureLookup): IPurchasableOffer | undefined => {
    if (!offer) return undefined;

    const productData = lookup.productData[offer.localizationId];
    const products: IProduct[] = offer.products.map((product) => {
        const furnitureData = getFurnitureData(lookup, product.spriteId, product.productType);

        return {
            productType: product.productType,
            classId: product.spriteId,
            extraParam: product.extraParam,
            productCount: getProductCountOverride(offer.localizationId, furnitureData, product.quantity),
            productData,
            furnitureData,
            isUnique: product.isUnique,
            uniqueSize: product.uniqueSize,
            uniqueLeft: product.uniqueRemaining,
        };
    });

    if (!products.length && !isBuildersClubLocalization(offer.localizationId)) return undefined;

    const singleChatStyle = isSingleChatStyle(products);

    // `Offer`'s constructor: the first badge, or (for an offer that is more than a chat style) the
    // first chat style, whichever comes first - the loop stops at either.
    let badgeCode: string | undefined = undefined;
    let extraChatStyleCode: string | undefined = undefined;

    for (const product of products) {
        if (product.productType === FurnitureTypeEnum.Badge) {
            badgeCode = product.extraParam;
            break;
        }

        if (!singleChatStyle && (product.productType === FurnitureTypeEnum.ChatStyle)) {
            extraChatStyleCode = product.extraParam;
            break;
        }
    }

    const purchasableOffer: IPurchasableOffer = {
        pricingModel: getPricingModelForProducts(products, singleChatStyle),
        pricingType: getPricingTypeForOffer(offer),
        offerId: offer.id,
        localizationId: offer.localizationId,
        priceInCredits: offer.costCredits,
        priceInActivityPoints: offer.costCurrency,
        activityPointType: offer.costCurrencyType,
        priceInSilver: offer.costSilver,
        giftable: offer.canGift,
        isRentOffer: offer.rentable,
        clubLevel: offer.clubLevel,
        products,
        bundlePurchaseAllowed: offer.canBundle,
        isLazy: false,
        page: undefined,
        badgeCode,
        extraChatStyleCode,
        isSingleChatStyle: singleChatStyle,
    };

    if (!((catalogType === CatalogTypeEnum.Normal) || ((purchasableOffer.pricingModel !== CatalogPricingModelEnum.Bundle) && (purchasableOffer.pricingModel !== CatalogPricingModelEnum.Multi)))) return undefined;

    return purchasableOffer;
};

/**
 * A search hit as a lazy offer - Flash's `FurnitureOffer` in a `FurniProductContainer`: it carries
 * the furniture only, and selecting it asks the server for the real offer (`sendGetProductOffer`).
 */
export const processFurnitureAsOffer = (furnitureData: IFurnitureData, lookup: CatalogFurnitureLookup): IPurchasableOffer | undefined => {
    if (!furnitureData) return undefined;

    return {
        pricingModel: CatalogPricingModelEnum.Furniture,
        pricingType: CatalogPricingTypeEnum.None,
        offerId: furnitureData.rentOfferId > -1 ? furnitureData.rentOfferId : furnitureData.purchaseOfferId,
        localizationId: `roomItem.name.${furnitureData.id}`,
        priceInCredits: 0,
        priceInActivityPoints: 0,
        activityPointType: 0,
        priceInSilver: 0,
        giftable: false,
        isRentOffer: furnitureData.rentOfferId > -1,
        clubLevel: 0,
        products: [
            {
                productType: furnitureData.type,
                classId: furnitureData.id,
                extraParam: furnitureData.customParams,
                productCount: 1,
                productData: lookup.productData[furnitureData.className],
                furnitureData,
                isUnique: false,
                uniqueSize: 0,
                uniqueLeft: 0,
            },
        ],
        bundlePurchaseAllowed: false,
        isLazy: true,
        page: undefined,
        badgeCode: '',
    };
};

/**
 * A snowwar game token offer as the purchase confirmation shows it - Flash's `GameTokensOffer`,
 * which the dialog takes through the same interface as an `Offer`: no page, no products, pricing
 * model `""` (here `Unknown`), price type credits, never giftable nor a bundle, no club level, no
 * badge, and `priceInSilver` -1 so no silver price shows.
 */
export const gameTokensOfferAsPurchasableOffer = (offer: GameTokensOffer): IPurchasableOffer => ({
    pricingModel: CatalogPricingModelEnum.Unknown,
    pricingType: CatalogPricingTypeEnum.Credits,
    offerId: offer.offerId,
    localizationId: offer.localizationId,
    priceInCredits: offer.priceInCredits,
    priceInActivityPoints: offer.priceInActivityPoints,
    activityPointType: offer.activityPointType,
    priceInSilver: -1,
    giftable: false,
    isRentOffer: false,
    clubLevel: 0,
    products: [],
    bundlePurchaseAllowed: false,
    isLazy: false,
    page: undefined,
    badgeCode: '',
    extraChatStyleCode: '',
    isSingleChatStyle: false,
});
