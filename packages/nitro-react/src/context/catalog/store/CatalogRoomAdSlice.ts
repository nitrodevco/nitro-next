/**
 * The room ad being bought - Flash's `HabboCatalog.roomAdPurchaseData` (`purchase/RoomAdPurchaseData`)
 * - and the last `RoomAdPurchaseInfoEvent` the room ads page asked for.
 *
 * `RoomAdsCatalogWidget` fills the purchase data as the user types and picks (name, description,
 * room, category, the offer it selected), `PurchaseCatalogWidget` checks it before a
 * `ROOM_INITIATE_PURCHASE` buy, and `HabboCatalog.purchaseProduct` sends `PurchaseRoomAdMessageComposer`
 * instead of a plain purchase when the offer bought is the one it names
 * (`commands/catalogRoomAdCommands`). Flash's data object is shared and written in place; here
 * every write is `updateRoomAdPurchaseData`, which creates it the way each Flash writer does
 * (`if (roomAdPurchaseData == null) roomAdPurchaseData = new RoomAdPurchaseData()`).
 *
 * `roomAdPurchaseInfo` is the answer the widget waits for: Flash's widget adds its own
 * `RoomAdPurchaseInfoEvent` listener while it lives; here the handler stores the answer and the
 * widget acts when it changes. `getRoomAdsPurchaseInfo` clears it before asking, so the widget
 * only ever acts on the answer to its own request.
 *
 * Neither is touched by `resetCatalog`: `HabboCatalog.reset` leaves them alone.
 *
 * The extension fields (`extended`, `extendedFlatId`, `roomName`, `expirationTime`) are filled only
 * by `HabboCatalog.openRoomAdCatalogPageInExtendedMode`, which the navigator's room event info
 * (`RoomEventInfoCtrl`'s extend button) calls. That window is not ported, so nothing opens the page
 * in extended mode yet; the widget and `purchaseProduct` read the fields exactly as Flash does,
 * so an ad extended from there will buy correctly once it is.
 */
import type { IRoomEntryData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** Flash's `RoomAdPurchaseData`, field for field. */
export interface CatalogRoomAdPurchaseData {
    readonly name: string | undefined;
    readonly description: string;
    readonly flatId: number;
    readonly offerId: number;
    readonly extended: boolean;
    readonly extendedFlatId: number;
    readonly roomName: string | undefined;
    readonly expirationTime: Date | undefined;
    readonly categoryId: number;
}

/** A new `RoomAdPurchaseData`: the fields' AS3 defaults, with `_description = ""` and the category's `-1`. */
export const CATALOG_ROOM_AD_PURCHASE_DATA_DEFAULTS: CatalogRoomAdPurchaseData = {
    name: undefined,
    description: '',
    flatId: 0,
    offerId: 0,
    extended: false,
    extendedFlatId: 0,
    roomName: undefined,
    expirationTime: undefined,
    categoryId: -1,
};

/** `RoomAdPurchaseInfoEventParser`: whether the user is VIP, and the rooms they may advertise. */
export interface CatalogRoomAdPurchaseInfo {
    readonly isVip: boolean;
    readonly rooms: readonly IRoomEntryData[];
}

type State = {
    roomAdPurchaseData: CatalogRoomAdPurchaseData | undefined;
    roomAdPurchaseInfo: CatalogRoomAdPurchaseInfo | undefined;
};

type Actions = {
    setRoomAdPurchaseData: (roomAdPurchaseData: CatalogRoomAdPurchaseData | undefined) => void;
    /** Writes fields of the purchase data, creating it first when there is none. */
    updateRoomAdPurchaseData: (fields: Partial<CatalogRoomAdPurchaseData>) => void;
    /** `RoomAdPurchaseData.clear()`: everything but the offer id and the expiration time goes back. */
    clearRoomAdPurchaseData: () => void;
    setRoomAdPurchaseInfo: (roomAdPurchaseInfo: CatalogRoomAdPurchaseInfo | undefined) => void;
};

export const CatalogRoomAdSliceInitialState: State = {
    roomAdPurchaseData: undefined,
    roomAdPurchaseInfo: undefined,
};

export type CatalogRoomAdSlice = State & Actions;

export const createCatalogRoomAdSlice: StateCreator<CatalogRoomAdSlice, [], [], CatalogRoomAdSlice> = set => ({
    ...CatalogRoomAdSliceInitialState,
    setRoomAdPurchaseData: roomAdPurchaseData => set({ roomAdPurchaseData }),
    updateRoomAdPurchaseData: fields => set(x => ({ roomAdPurchaseData: { ...(x.roomAdPurchaseData ?? CATALOG_ROOM_AD_PURCHASE_DATA_DEFAULTS), ...fields } })),
    clearRoomAdPurchaseData: () => set((x) => {
        if (!x.roomAdPurchaseData) return x;

        return {
            roomAdPurchaseData: {
                ...x.roomAdPurchaseData,
                name: undefined,
                description: '',
                flatId: 0,
                extended: false,
                roomName: undefined,
                extendedFlatId: -1,
                categoryId: -1,
            },
        };
    }),
    setRoomAdPurchaseInfo: roomAdPurchaseInfo => set({ roomAdPurchaseInfo }),
});
