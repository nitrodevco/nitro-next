import { CraftableProductsMessage, CraftingRecipeMessage, CraftingRecipesAvailableMessage, CraftingResultMessage, FurniListInvalidateEventMessage } from '@nitrodevco/nitro-packets';

import { onCraftableProducts, onCraftingFurniListInvalidate, onCraftingFurniListParsed, onCraftingRecipe, onCraftingRecipesAvailable, onCraftingResult } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore } from '#base/context/inventory';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * `CraftingWidgetHandler.addMessageEvents`: the table's four answers, plus the inventory's
 * `FurniListInvalidate` a craft waits for (`registerForFurniListInvalidate`) and its furni list
 * arriving (`HFLPE_FURNI_LIST_PARSED`), which the products wait for when the table opened before it.
 */
export const registerRoomCraftingHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const unsubscribePackets = subscribeAll(subscribe, [
        on(CraftableProductsMessage, data => onCraftableProducts(data.recipeProductItems, data.usableInventoryFurniClasses)),
        on(CraftingRecipeMessage, data => onCraftingRecipe(data.ingredients)),
        on(CraftingRecipesAvailableMessage, data => onCraftingRecipesAvailable(data.count, data.recipeComplete)),
        on(CraftingResultMessage, data => onCraftingResult(data.success, data.productData?.furnitureClassName ?? '')),
        on(FurniListInvalidateEventMessage, () => onCraftingFurniListInvalidate(send)),
    ]);

    const unsubscribeInventory = inventoryStore.subscribe((state, previous) => {
        if (state.furniCategoryInitialized && !previous.furniCategoryInitialized) onCraftingFurniListParsed(send);
    });

    return () => {
        unsubscribePackets();
        unsubscribeInventory();
    };
};
