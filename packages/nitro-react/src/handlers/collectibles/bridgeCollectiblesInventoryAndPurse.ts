/**
 * What the collectibles hub hears from the inventory and the purse - not a packet listener, hence
 * not a `*Handlers`.
 *
 * - `CollectiblesController.onInventoryInitialize` (the inventory's
 *   `HABBO_INVENTORY_CATEGORY_INITIALIZED` for `furni`): the minting tab stops waiting for the
 *   furni list.
 * - `itemAddedToInventory` / `itemRemovedFromInventory`, which `FurniModel` calls for every furni
 *   it adds or removes: the minting grid recounts its amounts (`amountChangedForItem`).
 * - `onEmeraldBalance` / `onSilverBalance` (`catalog_purse_*_balance`) -> `updateView` ->
 *   `updateBalances`: the header reads the purse itself; the transfer tab rechecks whether the
 *   fee is covered (`onSilverBalanceUpdated`).
 */
import { onCollectiblesInventoryChanged, onCollectiblesInventoryInitialized, updateTransferButtonState } from '#base/commands';
import { collectiblesStore } from '#base/context/collectibles';
import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore } from '#base/context/inventory';
import { userStore } from '#base/context/user';

export const bridgeCollectiblesInventoryAndPurse = ({ send }: WebSocketConnection) => {
    const unsubscribeInventory = inventoryStore.subscribe((state, previous) => {
        if (state.furniCategoryInitialized && !previous.furniCategoryInitialized) onCollectiblesInventoryInitialized(send);

        if (state.furniGroups !== previous.furniGroups) onCollectiblesInventoryChanged(send);
    });

    const unsubscribePurse = userStore.subscribe((state, previous) => {
        if ((state.silver === previous.silver) && (state.emeralds === previous.emeralds)) return;

        if (collectiblesStore.getState().hubCreated) updateTransferButtonState();
    });

    return () => {
        unsubscribeInventory();
        unsubscribePurse();
    };
};
