/**
 * The offer the targeted offer views show - Flash's `catalog/targetedoffers/data/TargetedOffer`
 * (over `TargetedOfferData`), held as a plain object. Flash hands one `TargetedOffer` instance from
 * view to view and `purchased(n)` decrements its `purchaseLimit` in place; here
 * `purchasedTargetedOffer` returns the decremented copy and the controller passes that on.
 *
 * `expirationTime` is Flash's `seconds * 1000 + getTimer()`, 0 for an offer that never expires:
 * a `performance.now()` timestamp the packet handler captures when the offer arrives, so the views
 * only compare it with `useSecondsClock`.
 */
import type { ITargetedOfferData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

export type TargetedOffer = Omit<ITargetedOfferData, 'secondsToExpiry'> & {
    /** `performance.now()` milliseconds at which the offer ends, 0 when it never does. */
    expirationTime: number;
};

/** `TargetedOffer.§_-91x§`: the seconds `getSecondsRemaining` keeps in hand before the real end. */
export const TARGETED_OFFER_EXPIRY_MARGIN = 10;

/** `TargetedOfferData.parse`: the seconds left become an absolute end, 0 when there are none. */
export const createTargetedOffer = ({ secondsToExpiry, ...data }: ITargetedOfferData, now: number): TargetedOffer => ({
    ...data,
    expirationTime: (secondsToExpiry > 0) ? ((secondsToExpiry * 1000) + now) : 0,
});

/**
 * `getSecondsRemaining`, as Sulake's JavaScript build writes it (floored, never below 0). The AS3
 * stores the difference in a `uint`, so in the last ten seconds it wraps round to four billion and
 * the offer never ends; the JavaScript build is the one that behaves as intended.
 */
export const targetedOfferSecondsRemaining = (offer: TargetedOffer, now: number) =>
    Math.max(0, Math.floor(((offer.expirationTime - now) / 1000) - TARGETED_OFFER_EXPIRY_MARGIN));

/** `isExpired`. */
export const isTargetedOfferExpired = (offer: TargetedOffer, now: number) =>
    (offer.expirationTime > 0) && (targetedOfferSecondsRemaining(offer, now) <= 0);

/** `checkPurseBalance(purse, quantity)`: the credits, and the offer's activity point type, cover `quantity` of it. */
export const checkTargetedOfferPurseBalance = (offer: TargetedOffer, credits: number, activityPoints: Record<number, number>, quantity: number) => {
    if (credits < (offer.priceInCredits * quantity)) return false;

    return ((activityPoints[offer.activityPointType] ?? 0) >= (offer.priceInActivityPoints * quantity));
};

/**
 * Flash's `catalog/targetedoffers/data/HabboMallOffer`: the offer the web page answers
 * `TargetedWebOffer.checkOffer` with (`MallOfferExternalInterfaceHelper.onShopOfferResult`), built
 * from the object it passes - `targetedOfferId` and `trackingStateCode` through `parseInt`, the rest
 * as they come.
 */
export interface HabboMallOffer {
    targetedOfferId: number;
    identifier: string;
    title: string;
    highlight: string;
    description: string;
    imageUrl: string;
    smallImageUrl: string;
    trackingState: number;
}

/** `new HabboMallOffer(param1)`: the page's object, read as Flash reads it. */
export const createHabboMallOffer = (data: Record<string, unknown>): HabboMallOffer => {
    const text = (value: unknown) => ((typeof value === 'string') || (typeof value === 'number') || (typeof value === 'boolean')) ? String(value) : '';

    return {
        targetedOfferId: parseInt(text(data.targetedOfferId)),
        identifier: text(data.identifier),
        title: text(data.header),
        highlight: text(data.highlight),
        description: text(data.description),
        imageUrl: text(data.imageUrl),
        smallImageUrl: text(data.smallImageUrl),
        trackingState: parseInt(text(data.trackingStateCode)),
    };
};

/** `TargetedOfferData.purchased(n)`, without touching the offer it is given. */
export const purchasedTargetedOffer = (offer: TargetedOffer, amount: number): TargetedOffer => ({ ...offer, purchaseLimit: offer.purchaseLimit - amount });

type State = {
    /** The offer of the view that is up; `null` when none is. */
    offer: TargetedOffer | null;
    /** The Habbo Mall offer of the mall view that is up; `null` when none is. */
    mallOffer: HabboMallOffer | null;
};

type Actions = {
    setOffer: (offer: TargetedOffer | null) => void;
    setMallOffer: (mallOffer: HabboMallOffer | null) => void;
};

export const TargetedOfferSliceInitialState: State = {
    offer: null,
    mallOffer: null,
};

export type TargetedOfferSlice = State & Actions;

export const createTargetedOfferSlice: StateCreator<TargetedOfferSlice, [], [], TargetedOfferSlice> = set => ({
    ...TargetedOfferSliceInitialState,
    setOffer: offer => set({ offer }),
    setMallOffer: mallOffer => set({ mallOffer }),
});
