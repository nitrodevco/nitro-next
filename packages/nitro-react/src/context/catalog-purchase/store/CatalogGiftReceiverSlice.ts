/**
 * `HabboCatalog.giftReceiver` (`§_-G1E§`): who the next gift goes to when the purchase names no one.
 * `PresentFurniWidget.openGiftShop` sets it to the sender of the present being opened, so that
 * "give a gift back" fills the gift dialog's name; `showPurchaseConfirmation` hands it to the
 * dialog, and giving a gift (`onGiveGiftButtonClick`) clears it.
 *
 * On the app-wide store because the room's present widget sets it, outside the catalogue window:
 * both `give_gift_button`s (`FurniturePresentWidget`, `FurniturePresentOpenedWidget`) set it.
 */
import { StateCreator } from 'zustand';

type State = {
    giftReceiver: string | undefined;
};

type Actions = {
    setGiftReceiver: (giftReceiver: string | undefined) => void;
};

export const CatalogGiftReceiverSliceInitialState: State = {
    giftReceiver: undefined,
};

export type CatalogGiftReceiverSlice = State & Actions;

export const createCatalogGiftReceiverSlice: StateCreator<CatalogGiftReceiverSlice, [], [], CatalogGiftReceiverSlice> = set => ({
    ...CatalogGiftReceiverSliceInitialState,
    setGiftReceiver: giftReceiver => set({ giftReceiver }),
});
