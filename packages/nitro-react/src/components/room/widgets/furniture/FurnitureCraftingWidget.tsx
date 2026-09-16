import { RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { CraftComposer, GetCraftingRecipeComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useRoomWidget, useRoomWidgetActions, useTranslation, useWebSocketContext } from '#base/context';
import { CraftingData, useRoomCraftingHandler } from '#base/handlers';
import { FurnitureCraftingView } from '#base/views/room-widgets/furniture/FurnitureCraftingView';

/**
 * A crafting table. What it can make is the server's answer to opening it, and choosing a recipe
 * asks what that one takes - so the ingredients on screen always belong to the recipe selected,
 * which is why picking one sends a packet of its own.
 */
export const FurnitureCraftingWidget = () => {
    // Only this dialog is told these things, and only while it is open.
    useRoomCraftingHandler();

    const request = useRoomWidget<CraftingData>(RoomWidgetEnum.CRAFTING);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const [ selectedRecipeCode, setSelectedRecipeCode ] = useState<string>('');
    const t = useTranslation();

    const data = request?.data;

    if (!request || !data) return null;

    /** A recipe is named by the furni it makes, which the client knows how to translate. */
    const productName = (furnitureClassName: string) => t(`roomItem.name.${furnitureClassName}`, furnitureClassName);

    const selectRecipe = (recipeCode: string) => {
        setSelectedRecipeCode(recipeCode);
        send(new GetCraftingRecipeComposer({ recipeCode }));
    };

    return (
        <FurnitureCraftingView
            products={data.products.map(product => ({
                recipeCode: product.recipeCode,
                name: productName(product.furnitureClassName),
            }))}
            selectedRecipeCode={selectedRecipeCode}
            ingredients={data.ingredients.map(ingredient => ({
                count: ingredient.count,
                name: productName(ingredient.furnitureClassName),
            }))}
            canCraft={data.recipeComplete && !!selectedRecipeCode.length}
            result={data.result.length ? productName(data.result) : ''}
            onSelectRecipe={selectRecipe}
            onCraft={() => send(new CraftComposer({ objectId: request.objectId, recipeCode: selectedRecipeCode }))}
            onClose={() => closeRoomWidget(RoomWidgetEnum.CRAFTING)}
        />
    );
};
