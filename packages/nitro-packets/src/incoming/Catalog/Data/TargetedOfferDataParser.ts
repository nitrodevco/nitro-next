// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseStrings } from '@nitrodevco/nitro-api';

/**
 * One targeted offer, as `TargetedOfferData.parse` reads it.
 *
 * Flash turns the seconds left into `seconds * 1000 + getTimer()` inside the parser (0 when the
 * offer never expires). A parser here stays a pure function of the bytes, so it hands back the
 * raw `secondsToExpiry`, and the handler that receives it captures the absolute expiry.
 */
export interface ITargetedOfferData {
    trackingState: number;
    id: number;
    identifier: string;
    productCode: string;
    priceInCredits: number;
    priceInActivityPoints: number;
    activityPointType: number;
    purchaseLimit: number;
    secondsToExpiry: number;
    title: string;
    description: string;
    imageUrl: string;
    iconImageUrl: string;
    type: number;
    subProductCodes: string[];
}

export const TargetedOfferDataParser = (wrapper: IMessageDataWrapper): ITargetedOfferData => ({
    trackingState: wrapper.readInt(),
    id: wrapper.readInt(),
    identifier: wrapper.readString(),
    productCode: wrapper.readString(),
    priceInCredits: wrapper.readInt(),
    priceInActivityPoints: wrapper.readInt(),
    activityPointType: wrapper.readInt(),
    purchaseLimit: wrapper.readInt(),
    secondsToExpiry: wrapper.readInt(),
    title: wrapper.readString(),
    description: wrapper.readString(),
    imageUrl: wrapper.readString(),
    iconImageUrl: wrapper.readString(),
    type: wrapper.readInt(),
    subProductCodes: ParseStrings(wrapper),
});
