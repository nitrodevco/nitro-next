/**
 * The Habbo Club offers as the catalogue shows them - the pure half of Flash's
 * `ClubBuyController.onOffers` (`new ClubBuyOfferData(...)`, `upgradeHcPeriodToVip`,
 * `orderByPrecedence`, `getPromotedMonths`) and of `HabboCatalogUtils.getPriceArray` for a
 * `ClubBuyOfferData`, which answers -1 silver and 0 emeralds and so only ever has credits and
 * activity points.
 */
import { CatalogPricingModelEnum, CatalogPricingTypeEnum, IActivePage, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { IClubOfferData } from '@nitrodevco/nitro-packets';

import type { ClubBuyOfferData } from '#base/context/catalog';

/** One entry of `getPriceArray`: an amount and its currency (-1 credits, else the activity point type). */
export interface ClubOfferPrice {
    amount: number;
    unit: number;
}

/**
 * `onOffers`: the offers as `ClubBuyOfferData`, the VIP one marked `upgradeHcPeriodToVip` when it
 * is the only VIP offer, sorted by months (`orderByPrecedence`).
 */
export const toClubBuyOffers = (offers: readonly IClubOfferData[]): ClubBuyOfferData[] => {
    const vipOffers = offers.filter(offer => offer.vip);

    return offers
        .map(offer => ({ ...offer, upgradeHcPeriodToVip: (vipOffers.length === 1) && (vipOffers[0] === offer) }))
        .sort((a, b) => a.months - b.months);
};

/**
 * `getPromotedMonths`: `catalog.vip.gift.promo` for a gift visualisation, `catalog.vip.buy.promo`
 * otherwise - a comma list of month counts, of which the positive numbers count.
 */
export const getClubPromotedMonths = (config: Record<string, unknown>, isGift: boolean): number[] => {
    const value = config[isGift ? 'catalog.vip.gift.promo' : 'catalog.vip.buy.promo'];

    if (((typeof value !== 'string') && (typeof value !== 'number')) || !String(value).length) return [];

    return String(value).split(',').map(part => parseInt(part, 10)).filter(months => !isNaN(months) && (months > 0));
};

/** The offers `onOffers` shows a visualisation: those with months, and of those only the promoted months when any are. */
export const getClubOffersToShow = (offers: readonly ClubBuyOfferData[], config: Record<string, unknown>, isGift: boolean): ClubBuyOfferData[] => {
    const promoted = getClubPromotedMonths(config, isGift);

    return offers.filter(offer => (offer.months > 0) && (!promoted.length || promoted.includes(offer.months)));
};

/** `getPriceArray` for a club offer: credits, then activity points; nothing to pay is `0` credits. */
export const getClubOfferPrices = (priceCredits: number, priceActivityPoints: number, activityPointType: number): ClubOfferPrice[] => {
    const prices: ClubOfferPrice[] = [];

    if (priceCredits > 0) prices.push({ amount: priceCredits, unit: -1 });
    if (priceActivityPoints > 0) prices.push({ amount: priceActivityPoints, unit: activityPointType });
    if (!prices.length) prices.push({ amount: 0, unit: -1 });

    return prices;
};

/**
 * A `ClubBuyOfferData` as the purchasable offer Flash's `PurchaseConfirmationDialog` takes it as
 * (it implements the same interface): no products, the product code as its localization id, its
 * prices, `giftable` from `isGiftable`, and no bundles, rent or club level.
 */
export const clubBuyOfferAsPurchasableOffer = (offer: ClubBuyOfferData, page: IActivePage | undefined): IPurchasableOffer => ({
    pricingModel: CatalogPricingModelEnum.Unknown,
    pricingType: CatalogPricingTypeEnum.Credits,
    offerId: offer.offerId,
    localizationId: offer.productCode,
    priceInCredits: offer.priceCredits,
    priceInActivityPoints: offer.priceActivityPoints,
    activityPointType: offer.priceActivityPointType,
    priceInSilver: -1,
    giftable: offer.isGiftable,
    isRentOffer: false,
    clubLevel: 0,
    products: [],
    bundlePurchaseAllowed: false,
    isLazy: false,
    badgeCode: '',
    page,
});
