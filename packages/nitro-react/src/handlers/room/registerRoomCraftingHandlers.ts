import { RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { CraftableProductsMessage, CraftingRecipeMessage, CraftingRecipesAvailableMessage, CraftingResultMessage, ICraftableProduct, ICraftingIngredient } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/** Everything the crafting table has been told, gathered as its four messages arrive. */
export type CraftingData = {
    products: ICraftableProduct[];
    usableInventoryFurniClasses: string[];
    /** What the recipe the user picked takes; only one recipe is ever asked about at a time. */
    ingredients: ICraftingIngredient[];
    recipeComplete: boolean;
    /** The furni class that came out, once something has. */
    result: string;
};

/**
 * The crafting table talks in four separate answers: what it can make, what a chosen recipe
 * takes, whether what is in the mixer adds up to one, and what came out. The widget needs them
 * together, so each merges into the open request.
 */
export const registerRoomCraftingHandlers = ({ subscribe }: WebSocketConnection) => {
    const { mergeRoomWidgetData } = roomStore.getState();

    const merge = (data: Partial<CraftingData>) => {
        mergeRoomWidgetData<CraftingData>(RoomWidgetEnum.CRAFTING, data);
    };

    return subscribeAll(subscribe, [
        on(CraftableProductsMessage, (message) => {
            merge({
                products: message.recipeProductItems,
                usableInventoryFurniClasses: message.usableInventoryFurniClasses,
            });
        }),

        on(CraftingRecipeMessage, (message) => {
            merge({ ingredients: message.ingredients });
        }),

        on(CraftingRecipesAvailableMessage, (message) => {
            merge({ recipeComplete: message.recipeComplete });
        }),

        on(CraftingResultMessage, (message) => {
            merge({ result: message.success ? (message.productData?.furnitureClassName ?? '') : '' });
        }),
    ]);
};
