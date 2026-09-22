/**
 * Dragging a catalogue offer into the room - the object mover state Flash's `HabboCatalog` keeps
 * between `requestSelectedItemToMover`, the room engine's `REOE_PLACED` / `REOE_PLACED_ON_USER`
 * and the purchase that follows (`onObjectPlacedInRoom`, `resetPlacedOfferData`,
 * `itemAddedToInventory`):
 *
 * - `offerInFurniPlacing` / `callbackReceiver` - `_offerInFurniPlacing` and
 *   `_offerPlacingCallbackReceiver`: the offer being placed and the widget told when it lands
 *   (`ItemGridCatalogWidget.onDragAndDropDone`, which starts the purchase);
 * - `isObjectMoverRequested` - `§_-7E§`: a drag is on, so the catalogue window is hidden;
 * - `repeatPlacement` - `§_-51G§`: the builders club places the same offer again after each drop;
 * - `placedObjectPurchaseData` - `§_-31m§`, a `PlacedObjectPurchaseData`: where the offer was
 *   dropped, kept while its purchase confirmation is open, so the bought item can be placed there;
 * - `catalogStore` - the catalogue the drag started from (Flash's `_catalogType` and its
 *   `CatalogWindowState`): its type decides what a drop does, and its page hears the room change
 *   when the window comes back.
 *
 * An app-wide singleton: the drag outlives the catalogue window (which it hides), and the
 * inventory's furni listener (`itemAddedToInventory`) reads it.
 */
import { IPurchasableOffer, RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { StateCreator, StoreApi } from 'zustand';

import type { CatalogStore } from '#base/context/catalog';

/** Flash's `§_-XJ§` - what a widget implements to hear how a drag it started ended. */
export interface ICatalogDragAndDropReceiver {
    /** `onDragAndDropDone(placed, userName)`: `userName` is the avatar the offer was dropped on, if any. */
    onDragAndDropDone: (placed: boolean, userName: string | undefined) => void;
}

/** `PlacedObjectPurchaseData`: where a dragged offer was put down, and the offer's product. */
export interface CatalogPlacedObjectPurchaseData {
    readonly roomId: number;
    readonly objectId: number;
    readonly category: RoomObjectCategoryEnum;
    readonly wallLocation: string;
    readonly x: number;
    readonly y: number;
    readonly direction: number;
    readonly offerId: number;
    readonly productClassId: number;
    /** The product's `extraParam` (`extraParameter`): the wallpaper, floor or landscape pattern. */
    readonly extraParameter: string;
    /** `furniData.className` - `floor`, `wallpaper` and `landscape` change the room instead of adding an object. */
    readonly furniClassName: string;
}

type State = {
    offerInFurniPlacing: IPurchasableOffer | undefined;
    callbackReceiver: ICatalogDragAndDropReceiver | undefined;
    isObjectMoverRequested: boolean;
    repeatPlacement: boolean;
    placedObjectPurchaseData: CatalogPlacedObjectPurchaseData | undefined;
    catalogStore: StoreApi<CatalogStore> | undefined;
    /**
     * The port's own: the catalogue window was hidden or shown by the mover (`hideMainWindow`,
     * `showMainWindow`) rather than by the user's `toggleCatalog`, which alone cancels the mover.
     * The window's visibility is a store value here, so the mover marks its own change for the
     * listener that tells the two apart.
     */
    windowToggledByMover: boolean;
};

type Actions = {
    setOfferInFurniPlacing: (offer: IPurchasableOffer | undefined, callbackReceiver: ICatalogDragAndDropReceiver | undefined, repeatPlacement: boolean) => void;
    setIsObjectMoverRequested: (isObjectMoverRequested: boolean) => void;
    setCallbackReceiver: (callbackReceiver: ICatalogDragAndDropReceiver | undefined) => void;
    setPlacedObjectPurchaseData: (placedObjectPurchaseData: CatalogPlacedObjectPurchaseData | undefined) => void;
    setWindowToggledByMover: (windowToggledByMover: boolean) => void;
    setCatalogStore: (catalogStore: StoreApi<CatalogStore> | undefined) => void;
};

export const CatalogPlacementSliceInitialState: State = {
    offerInFurniPlacing: undefined,
    callbackReceiver: undefined,
    isObjectMoverRequested: false,
    repeatPlacement: false,
    placedObjectPurchaseData: undefined,
    catalogStore: undefined,
    windowToggledByMover: false,
};

export type CatalogPlacementSlice = State & Actions;

export const createCatalogPlacementSlice: StateCreator<CatalogPlacementSlice, [], [], CatalogPlacementSlice> = set => ({
    ...CatalogPlacementSliceInitialState,
    setOfferInFurniPlacing: (offerInFurniPlacing, callbackReceiver, repeatPlacement) => set({ offerInFurniPlacing, callbackReceiver, repeatPlacement }),
    setIsObjectMoverRequested: isObjectMoverRequested => set({ isObjectMoverRequested }),
    setCallbackReceiver: callbackReceiver => set({ callbackReceiver }),
    setPlacedObjectPurchaseData: placedObjectPurchaseData => set({ placedObjectPurchaseData }),
    setWindowToggledByMover: windowToggledByMover => set({ windowToggledByMover }),
    setCatalogStore: catalogStore => set({ catalogStore }),
});
