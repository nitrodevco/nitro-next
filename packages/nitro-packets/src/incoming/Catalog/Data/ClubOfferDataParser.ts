// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * One Habbo Club offer - Flash's `ClubOfferData`, read in its field order: the boolean after the
 * product code is read and dropped, as Flash does, and `isGiftable` comes before the days left.
 */
export interface IClubOfferData {
    offerId: number;
    productCode: string;
    priceCredits: number;
    priceActivityPoints: number;
    priceActivityPointType: number;
    vip: boolean;
    months: number;
    extraDays: number;
    isGiftable: boolean;
    daysLeftAfterPurchase: number;
    year: number;
    month: number;
    day: number;
}

/**
 * The discounted extension offer - Flash's `ClubOfferExtendData`, a `ClubOfferData` followed by
 * the normal monthly prices, the currency they are in and how long the offer lasts.
 */
export interface IClubOfferExtendData extends IClubOfferData {
    /** The normal credit price of one month; `originalPrice` is this times `months`. */
    originalPricePerMonth: number;
    /** The normal activity point price of one month. */
    originalActivityPointPricePerMonth: number;
    originalActivityPointType: number;
    subscriptionDaysLeft: number;
}

export const ClubOfferDataParser = (wrapper: IMessageDataWrapper): IClubOfferData => {
    const offerId = wrapper.readInt();
    const productCode = wrapper.readString();

    wrapper.readBoolean();

    return {
        offerId,
        productCode,
        priceCredits: wrapper.readInt(),
        priceActivityPoints: wrapper.readInt(),
        priceActivityPointType: wrapper.readInt(),
        vip: wrapper.readBoolean(),
        months: wrapper.readInt(),
        extraDays: wrapper.readInt(),
        isGiftable: wrapper.readBoolean(),
        daysLeftAfterPurchase: wrapper.readInt(),
        year: wrapper.readInt(),
        month: wrapper.readInt(),
        day: wrapper.readInt(),
    };
};

export const ClubOfferExtendDataParser = (wrapper: IMessageDataWrapper): IClubOfferExtendData => {
    const offer = ClubOfferDataParser(wrapper);

    return {
        ...offer,
        originalPricePerMonth: wrapper.readInt(),
        originalActivityPointPricePerMonth: wrapper.readInt(),
        originalActivityPointType: wrapper.readInt(),
        subscriptionDaysLeft: wrapper.readInt(),
    };
};
