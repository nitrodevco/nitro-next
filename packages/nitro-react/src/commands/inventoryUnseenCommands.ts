/**
 * The unseen item tracker's side that talks to the server - Flash `inventory/UnseenItemTracker`
 * (`resetCategory`, `resetCategoryIfEmpty`, `removeUnseen`, `setUnseenItem`) and the models'
 * `resetUnseenItems` that call it:
 *
 * - `resetCategory` sends `ResetUnseenItemsComposer` only when the category held anything;
 *   `resetCategoryIfEmpty` sends it only when it holds nothing (which is how a removal that
 *   empties a category tells the server).
 * - `InventoryMainView.resetUnseenCounters` resets the page being left - on a tab switch
 *   (`windowEventProc`'s `WE_SELECTED`) and, through each model's `closingInventoryView`, the
 *   page that is showing when the window closes: furni (and rentables) `FurniModel`, pets, badges,
 *   collectibles and bots.
 * - `FurniListRemove` resets the furni page whatever is showing (`onFurniListRemove` ->
 *   `FurniModel.resetUnseenItems`): picking something up, placing it or trading it away clears
 *   every "new" furni mark.
 * - `removeUnseenFurniCounter` is what the gift card's place button does with the gifted item
 *   (`PresentFurniWidget.onPlaceInRoom`).
 *
 * `BadgesModel.resetUnseenItems` also returns while the inventory is not the active window
 * (`isMainViewActive`, the window's active state flag): here, while it is not the window the
 * system store last brought to the front (`topId`), which a frame takes when it opens and when it
 * is pressed.
 * `HabboUnseenItemsUpdatedEvent` is not sent anywhere: its readers (the toolbar, the tab
 * counters) read the counts from `inventoryStore`.
 */
import { ResetUnseenItemsComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore, isUnseenItem, UnseenItemCategory } from '#base/context/inventory';
import { systemStore } from '#base/context/system';

/** `InventoryView`'s frame id: the window `isMainViewActive` asks about. */
const INVENTORY_FRAME_ID = 'inventory';

type Send = WebSocketConnection['send'];

/** The inventory's pages (`InventoryMainView`'s tab names) whose unseen items a switch away resets. */
export type InventoryUnseenPage = 'furni' | 'rentables' | 'pets' | 'badges' | 'collectibles' | 'bots';

/** `UnseenItemTracker.resetCategory`: the category is seen, and the server told so if it held anything. */
export const resetInventoryUnseenCategory = (send: Send, category: number) => {
    if (inventoryStore.getState().resetUnseenCategory(category)) send(new ResetUnseenItemsComposer({ category }));
};

/** `UnseenItemTracker.resetCategoryIfEmpty`. */
export const resetInventoryUnseenCategoryIfEmpty = (send: Send, category: number) => {
    if (inventoryStore.getState().resetUnseenCategoryIfEmpty(category)) send(new ResetUnseenItemsComposer({ category }));
};

/** `UnseenItemTracker.removeUnseen`: true when the id was unseen. The server is not told. */
export const removeInventoryUnseenItem = (category: number, id: number): boolean => inventoryStore.getState().removeUnseenItem(category, id);

/** `UnseenItemTracker.setUnseenItem`: one id becomes unseen on the client's own say-so. */
export const setInventoryUnseenItem = (category: number, id: number) => {
    const { addUnseenItems, updateFurniUnseenThumbs } = inventoryStore.getState();

    addUnseenItems(category, [ id ]);
    // `onUnseenItemsUpdate`: the pets', bots' and badges' marks and every count are read from the store.
    updateFurniUnseenThumbs();
};

/**
 * `FurniModel.resetUnseenItems`: the furni page is always `furni` here (the rentables page is not
 * shown, `mergeRentFurni`), so category 1 is reset and every group loses its mark.
 *
 * Flash resets category 2 when its rentables page is left. That page is merged into this one, so
 * the rented furni it lists are seen here too, and category 2 goes with category 1 - otherwise a
 * rental would hold the toolbar count above zero for good. `resetCategory` only sends for a
 * category that holds something, so a hotel without rentals sends nothing more.
 */
export const resetInventoryFurniUnseenItems = (send: Send) => {
    resetInventoryUnseenCategory(send, UnseenItemCategory.OWNED_FURNI);
    resetInventoryUnseenCategory(send, UnseenItemCategory.RENTED_FURNI);
    inventoryStore.getState().resetFurniUnseenItems();
};

/** `InventoryMainView.resetUnseenCounters(page)`: the models' `resetUnseenItems`. */
export const resetInventoryUnseenCounters = (send: Send, page: InventoryUnseenPage) => {
    switch (page) {
        case 'furni':
        case 'rentables':
            resetInventoryFurniUnseenItems(send);
            return;
        case 'pets':
            resetInventoryUnseenCategory(send, UnseenItemCategory.PET);
            return;
        case 'badges':
            // `BadgesModel.resetUnseenItems`: nothing at all unless the inventory is the active window.
            if (systemStore.getState().topId !== INVENTORY_FRAME_ID) return;

            resetInventoryUnseenCategory(send, UnseenItemCategory.BADGE);
            inventoryStore.getState().resetBadgesUnseen();
            return;
        case 'collectibles':
            resetInventoryUnseenCategory(send, UnseenItemCategory.COLLECTIBLES);
            return;
        case 'bots':
            resetInventoryUnseenCategory(send, UnseenItemCategory.BOT);
    }
};

/**
 * `HabboInventory.removeUnseenFurniCounter` -> `FurniModel.removeUnseenFurniCounter`: when a group
 * holds the strip id and the id is unseen in the page's category (always 1 here), it is no longer,
 * and the server hears once the category is empty. True when it was unseen.
 */
export const removeInventoryUnseenFurniCounter = (send: Send, stripId: number): boolean => {
    const { furniGroups, unseenItems } = inventoryStore.getState();

    if (!furniGroups.some(group => group.items.some(item => item.id === stripId))) return false;

    if (!isUnseenItem(unseenItems, UnseenItemCategory.OWNED_FURNI, stripId) || !removeInventoryUnseenItem(UnseenItemCategory.OWNED_FURNI, stripId)) return false;

    resetInventoryUnseenCategoryIfEmpty(send, UnseenItemCategory.OWNED_FURNI);

    return true;
};

/**
 * `HabboInventory.removeUnseenPetCounter` -> `PetsModel.removeUnseenFurniCounter`: an unseen pet is
 * no longer, and the server hears once the pets' category is empty. True when it was unseen.
 */
export const removeInventoryUnseenPetCounter = (send: Send, petId: number): boolean => {
    if (!isUnseenItem(inventoryStore.getState().unseenItems, UnseenItemCategory.PET, petId) || !removeInventoryUnseenItem(UnseenItemCategory.PET, petId)) return false;

    resetInventoryUnseenCategoryIfEmpty(send, UnseenItemCategory.PET);

    return true;
};
