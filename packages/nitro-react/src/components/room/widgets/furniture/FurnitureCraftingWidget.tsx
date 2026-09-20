import { RoomObjectVariableEnum, RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { CraftComposer, GetCraftingRecipeComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { useOwnUserId } from '#base/context/user';
import { CraftingData } from '#base/handlers';
import { FurnitureCraftingView } from '#base/views/room-widgets/furniture/FurnitureCraftingView';

/**
 * A crafting table. What it can make is the server's answer to opening it, and choosing a recipe
 * asks what that one takes - so the ingredients on screen always belong to the recipe selected,
 * which is why picking one sends a packet of its own.
 *
 * Only the table's owner may craft on it (`CraftingWidgetHandler.isOwner`, the furni's owner id
 * against the session's); anyone else sees the button disabled, captioned `crafting.btn.notowner`.
 */
export const FurnitureCraftingWidget = () => {
    const request = useRoomWidget<CraftingData>(RoomWidgetEnum.CRAFTING);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const [ selectedRecipeCode, setSelectedRecipeCode ] = useState<string>('');
    const room = useRoom();
    const ownUserId = useOwnUserId();
    const t = useTranslation();

    const data = request?.data;

    if (!request || !data) return null;

    const isOwner = room?.getRoomObject(request.objectId, request.category)?.model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId) === ownUserId;

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
            isOwner={isOwner}
            canCraft={data.recipeComplete && !!selectedRecipeCode.length}
            result={data.result.length ? productName(data.result) : ''}
            onSelectRecipe={selectRecipe}
            onCraft={() => send(new CraftComposer({ objectId: request.objectId, recipeCode: selectedRecipeCode }))}
            onClose={() => closeRoomWidget(RoomWidgetEnum.CRAFTING)}
        />
    );
};
