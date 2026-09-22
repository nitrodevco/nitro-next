/**
 * Renting a rentable furni again, or buying it out - Flash's `RentConfirmationWindow`, which
 * `HabboCatalog.openRentConfirmationWindow` opens from the infostand (`InfoStandFurniView`'s
 * extend and buyout buttons, with the room object id) and the inventory (`FurniModel`, with the
 * strip id).
 *
 * `request` is what `show` was given - the furni type, whether it is a buyout, the object or strip
 * id and, from those, `_mode` (`MODE_INFOSTAND` 1, `MODE_INVENTORY` 2). Flash's third mode,
 * `MODE_CATALOGUE` (buy the type's rent offer, `purchaseOffer(rentOfferId)`), is set by a `show`
 * argument no caller of `openRentConfirmationWindow` passes, so it is not carried. `offer`
 * is the server's `FurniRentOrBuyoutOfferMessage` for it: the window is built only once that
 * arrives (`onFurniRentOrBuyoutOffer`), and `close()` takes both down.
 */
import { IFurnitureData } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

/** `RentConfirmationWindow`'s `_mode` values. */
export const RENT_CONFIRMATION_MODE_INFOSTAND = 1;
export const RENT_CONFIRMATION_MODE_INVENTORY = 2;

/** What `RentConfirmationWindow.show` keeps. */
export interface CatalogRentRequest {
    readonly furniData: IFurnitureData;
    readonly isBuyout: boolean;
    /** `§_-a1L§`: the room object id, -1 unless opened from the infostand. */
    readonly objectId: number;
    /** `§_-n7§`: the inventory strip id, -1 unless opened from the inventory. */
    readonly stripId: number;
    readonly mode: number;
}

/** `FurniRentOrBuyoutOfferMessageParser`, as the window reads it. */
export interface CatalogRentOffer {
    /** `_isBuyout`: the offer's own buyout flag, which picks the window's caption and button. */
    readonly isBuyout: boolean;
    readonly priceInCredits: number;
    readonly priceInActivityPoints: number;
    readonly activityPointType: number;
}

type State = {
    rentRequest: CatalogRentRequest | undefined;
    rentOffer: CatalogRentOffer | undefined;
};

type Actions = {
    setRentRequest: (rentRequest: CatalogRentRequest | undefined) => void;
    setRentOffer: (rentOffer: CatalogRentOffer | undefined) => void;
};

export const CatalogRentSliceInitialState: State = {
    rentRequest: undefined,
    rentOffer: undefined,
};

export type CatalogRentSlice = State & Actions;

export const createCatalogRentSlice: StateCreator<CatalogRentSlice, [], [], CatalogRentSlice> = set => ({
    ...CatalogRentSliceInitialState,
    setRentRequest: rentRequest => set({ rentRequest, rentOffer: undefined }),
    setRentOffer: rentOffer => set({ rentOffer }),
});
