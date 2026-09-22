/**
 * The marketplace's data and the pure parts of its logic, shared by the catalogue's side
 * (`catalog/marketplace/MarketPlaceLogic`, the two marketplace page widgets and
 * `MarketplaceConfirmationDialog`) and the inventory's (`inventory/marketplace/MarketplaceModel`
 * and `MarketplaceView`).
 *
 * - `MarketplaceOfferData` is Flash's `MarketPlaceOfferData`, immutable here: where Flash writes
 *   `offerId`, `price` or `offerCount` of a held offer (`MarketPlaceLogic.onBuyResult`, result 3),
 *   the port replaces the object. `image` / `imageCallback` are not kept - the views draw the
 *   furni icon from the room engine by type id.
 * - `MarketplaceItemStats` is `catalog/marketplace/§_-xH§`, which both `HabboCatalog` and the
 *   inventory's `IncomingMessages` build from `MarketplaceItemStatsEvent`.
 * - The constant tables are `§_-u1f§` (an offer's status), `§_-z1j§` (the own offers' categories)
 *   and `MarketPlaceOfferData`'s two furni types, under Flash's names where they have one.
 */
import { IFurnitureData, IObjectData } from '@nitrodevco/nitro-api';
import { IMarketPlaceOffersOffer } from '@nitrodevco/nitro-packets';

/** `MarketPlaceOfferData.§_-Y1s§` / `§_-c2Y§`: a floor item and a wall item. */
export const MARKETPLACE_FURNI_TYPE_FLOOR = 1;
export const MARKETPLACE_FURNI_TYPE_WALL = 2;

/** `§_-u1f§`: an offer's status - `ONGOING` (and its twin `§_-N2W§`), `SOLD`, `EXPIRED`. */
export const MARKETPLACE_OFFER_STATUS_ONGOING = 1;
export const MARKETPLACE_OFFER_STATUS_SOLD = 2;
export const MARKETPLACE_OFFER_STATUS_EXPIRED = 3;

/** `§_-z1j§`: the own offers' categories - `OPEN`, `SOLD`, `EXPIRED`. */
export const MARKETPLACE_OWN_CATEGORY_OPEN = 1;
export const MARKETPLACE_OWN_CATEGORY_SOLD = 2;
export const MARKETPLACE_OWN_CATEGORY_EXPIRED = 3;

/** `§_-z1j§.isClearable`: only sold and expired offers can be marked seen. */
export const isMarketplaceOwnCategoryClearable = (category: number) => ((category === MARKETPLACE_OWN_CATEGORY_SOLD) || (category === MARKETPLACE_OWN_CATEGORY_EXPIRED));

/** `MarketPlaceLogic.PURCHASE_CONFIRM_TYPE_NORMAL` / `_HIGHER` / `§_-zA§`: which header the purchase confirmation shows. */
export const MARKETPLACE_PURCHASE_CONFIRM_TYPE_NORMAL = 1;
export const MARKETPLACE_PURCHASE_CONFIRM_TYPE_HIGHER = 2;
export const MARKETPLACE_PURCHASE_CONFIRM_TYPE_3 = 3;

/** `MarketPlaceLogic.resolveStatsRequestCategory`'s answers: a floor item, a wall item, a limited item. */
export const MARKETPLACE_STATS_CATEGORY_FLOOR = 1;
export const MARKETPLACE_STATS_CATEGORY_WALL = 2;
export const MARKETPLACE_STATS_CATEGORY_UNIQUE = 3;

/** `MarketPlaceOfferData`. */
export interface MarketplaceOfferData {
    offerId: number;
    furniId: number;
    furniType: number;
    extraData: string;
    stuffData: IObjectData | undefined;
    price: number;
    status: number;
    averagePrice: number;
    /** -1 for an own offer, which the server sends no count for. */
    offerCount: number;
    isUsable: boolean;
    isUsed: boolean;
    timeLeftMinutes: number;
    /** When a sold or expired own offer changed status (ms since the epoch); NaN otherwise. */
    statusTime: number;
}

/** `catalog/marketplace/§_-xH§`. */
export interface MarketplaceItemStats {
    averagePrice: number;
    offerCount: number;
    historyLength: number;
    dayOffsets: readonly number[];
    averagePrices: readonly number[];
    soldAmounts: readonly number[];
    furniTypeId: number;
    furniCategoryId: number;
    lowestCurrentPrice: number;
    suggestedPrice: number;
}

/**
 * `new MarketPlaceOfferData(...)` as `MarketPlaceLogic.onOffers` (`own` false) and `onOwnOffers`
 * (`own` true) build it: an own offer has no offer count and no usage state, but its status time.
 */
export const createMarketplaceOfferData = (offer: IMarketPlaceOffersOffer, own: boolean): MarketplaceOfferData => ({
    offerId: offer.offerId,
    furniId: offer.furniId,
    furniType: offer.furniType,
    extraData: offer.extraData,
    stuffData: offer.stuffData,
    price: offer.price,
    status: offer.status,
    averagePrice: offer.averagePrice,
    offerCount: own ? -1 : offer.offerCount,
    isUsable: own ? false : (offer.isUsable ?? false),
    isUsed: own ? false : (offer.isUsed ?? false),
    timeLeftMinutes: offer.timeLeftMinutes,
    statusTime: own ? (offer.statusTime ?? NaN) : NaN,
});

/** `MarketPlaceOfferData.isUniqueLimitedItem`. */
export const isMarketplaceUniqueLimitedItem = (offer: MarketplaceOfferData) => ((offer.stuffData?.uniqueNumber ?? 0) > 0);

/** The furni data behind an offer - `HabboCatalog.getFurnitureData(furniId, "s" | "i")`. */
export const getMarketplaceOfferFurniData = (offer: MarketplaceOfferData, floorItems: Record<number, IFurnitureData>, wallItems: Record<number, IFurnitureData>): IFurnitureData | undefined => {
    if (offer.furniType === MARKETPLACE_FURNI_TYPE_FLOOR) return floorItems[offer.furniId];
    if (offer.furniType === MARKETPLACE_FURNI_TYPE_WALL) return wallItems[offer.furniId];

    return undefined;
};

/** `MarketPlaceLogic.isPosterItem`: a wall item whose class is `poster`, with its poster id as the extra data. */
export const isMarketplacePosterItem = (offer: MarketplaceOfferData, wallItems: Record<number, IFurnitureData>) => ((offer.furniType === MARKETPLACE_FURNI_TYPE_WALL) && (offer.extraData !== undefined) && (wallItems[offer.furniId]?.className === 'poster'));

/** `MarketPlaceLogic.getNameLocalizationKey`: a poster's `poster_<id>_name`, else `roomItem.name.<id>` / `wallItem.name.<id>`, '' for neither type. */
export const getMarketplaceNameLocalizationKey = (offer: MarketplaceOfferData, wallItems: Record<number, IFurnitureData>): string => {
    if (isMarketplacePosterItem(offer, wallItems)) return `poster_${offer.extraData}_name`;
    if (offer.furniType === MARKETPLACE_FURNI_TYPE_FLOOR) return `roomItem.name.${offer.furniId}`;
    if (offer.furniType === MARKETPLACE_FURNI_TYPE_WALL) return `wallItem.name.${offer.furniId}`;

    return '';
};

/** `MarketPlaceLogic.getDescriptionLocalizationKey`: as the name, with `_desc` / `.desc.`. */
export const getMarketplaceDescriptionLocalizationKey = (offer: MarketplaceOfferData, wallItems: Record<number, IFurnitureData>): string => {
    if (isMarketplacePosterItem(offer, wallItems)) return `poster_${offer.extraData}_desc`;
    if (offer.furniType === MARKETPLACE_FURNI_TYPE_FLOOR) return `roomItem.desc.${offer.furniId}`;
    if (offer.furniType === MARKETPLACE_FURNI_TYPE_WALL) return `wallItem.desc.${offer.furniId}`;

    return '';
};

/**
 * The texts the widgets set as `"${" + getNameLocalizationKey(offer) + "}"` and the description's
 * likewise - the localizations `FurnitureDataParser` registers from the furni data, or a poster's.
 */
export const getMarketplaceOfferTexts = (offer: MarketplaceOfferData, wallItems: Record<number, IFurnitureData>, t: (key: string, defaultValue?: string) => string): { name: string; description: string } => {
    const nameKey = getMarketplaceNameLocalizationKey(offer, wallItems);
    const descriptionKey = getMarketplaceDescriptionLocalizationKey(offer, wallItems);

    return { name: nameKey ? t(nameKey, '') : '', description: descriptionKey ? t(descriptionKey, '') : '' };
};

/** `MarketPlaceLogic.resolveStatsRequestCategory`. */
export const resolveMarketplaceStatsCategory = (offer: MarketplaceOfferData) => {
    if (isMarketplaceUniqueLimitedItem(offer)) return MARKETPLACE_STATS_CATEGORY_UNIQUE;

    return (offer.furniType === MARKETPLACE_FURNI_TYPE_WALL) ? MARKETPLACE_STATS_CATEGORY_WALL : MARKETPLACE_STATS_CATEGORY_FLOOR;
};

/**
 * `MarketplaceView.calculateFinalPrice`: what the seller gets for an asking price - the selling
 * fee plus a tax that grows with the price up to half of it at `halfTaxLimit`, rounded to three
 * places, then up.
 */
export const calculateMarketplaceFinalPrice = (price: number, sellingFeePercentage: number, halfTaxLimit: number): number => {
    const tax = Math.ceil(Math.round(1000 * (price * ((sellingFeePercentage / 100) + ((0.5 * price) / halfTaxLimit)))) / 1000);

    return price - tax;
};

/** `new Date(statusTime).toLocaleString()` - `MarketPlaceOwnItemsCatalogWidget.formatStatusTime`. */
export const formatMarketplaceStatusTime = (statusTime: number) => new Date(statusTime).toLocaleString();

/** `MarketplaceItemStatsEvent` read into `§_-xH§`. */
export const createMarketplaceItemStats = (data: MarketplaceItemStats): MarketplaceItemStats => ({
    averagePrice: data.averagePrice,
    offerCount: data.offerCount,
    historyLength: data.historyLength,
    dayOffsets: data.dayOffsets.slice(),
    averagePrices: data.averagePrices.slice(),
    soldAmounts: data.soldAmounts.slice(),
    furniTypeId: data.furniTypeId,
    furniCategoryId: data.furniCategoryId,
    lowestCurrentPrice: data.lowestCurrentPrice,
    suggestedPrice: data.suggestedPrice,
});
