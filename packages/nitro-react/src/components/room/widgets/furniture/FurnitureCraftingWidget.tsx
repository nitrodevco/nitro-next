import { RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { addInventoryItemToMixer, cancelCrafting, closeCraftingTable, completeCrafting, CraftingData, removeMixerItem, selectCraftingRecipe, startCrafting } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidget } from '#base/context/room';
import { useOwnUserId } from '#base/context/user';
import { isFurnitureOwnedBy } from '#base/utils';
import { FurnitureCraftingView } from '#base/views/room-widgets/furniture/FurnitureCraftingView';

/** `CraftingProgressBarController`: a 70 ms timer, 0.02 a tick. */
const PROGRESS_TICK_MS = 70;
const PROGRESS_STEP = 0.02;

/**
 * A crafting table (`CraftingWidget`): `roomCraftingCommands` keeps what the window shows; this
 * draws it once the table has answered with something to make or use (`showWidget`) and runs the
 * progress bar a craft waits on.
 *
 * Only the table's owner may craft on it (`CraftingWidgetHandler.isOwner`, the furni's owner id
 * against the session's); anyone else sees the button disabled, captioned `crafting.btn.notowner`.
 */
export const FurnitureCraftingWidget = () => {
    const request = useRoomWidget<Partial<CraftingData>>(RoomWidgetEnum.CRAFTING);
    const { send } = useWebSocketContext();
    const room = useRoom();
    const ownUserId = useOwnUserId();
    const [ progress, setProgress ] = useState(0);

    const data = request?.data;
    const progressVisible = !!data?.progressVisible;

    // `show` starts the timer at 0; at 1 it stops and the craft goes (`onProgressBarComplete`).
    useEffect(() => {
        if (!progressVisible) return;

        let value = 0;

        const timer = window.setInterval(() => {
            value += PROGRESS_STEP;
            setProgress(value);

            if (value >= 1) {
                window.clearInterval(timer);
                completeCrafting(send);
            }
        }, PROGRESS_TICK_MS);

        return () => {
            window.clearInterval(timer);
            setProgress(0);
        };
    }, [ progressVisible, send ]);

    if (!request || !data?.shown) return null;

    const isOwner = isFurnitureOwnedBy(room?.getRoomObject(request.objectId, request.category), ownUserId);

    return (
        <FurnitureCraftingView
            recipes={(data.recipeItems ?? []).map(item => ({ key: item.key, furnitureData: item.furnitureData, available: true }))}
            inventory={(data.inventoryItems ?? []).map(item => ({ key: item.key, furnitureData: item.furnitureData, count: item.inventoryIds.length, available: item.inventoryIds.length > 0 }))}
            mixer={(data.mixerItems ?? []).map(item => ({ key: item.key, furnitureData: item.furnitureData, available: item.inventoryId !== 0 }))}
            infoText={data.infoText ?? ''}
            infoText1={data.infoText1 ?? ''}
            infoText2={data.infoText2 ?? ''}
            icon={data.icon}
            buttonVisible={!!data.button?.visible}
            buttonEnabled={!!data.button?.enabled}
            buttonCaption={data.button?.caption ?? ''}
            isOwner={isOwner}
            progressVisible={progressVisible}
            progress={progress}
            onRecipe={key => selectCraftingRecipe(send, key)}
            onInventoryItem={key => addInventoryItemToMixer(send, key)}
            onMixerItem={key => removeMixerItem(send, key)}
            onCraft={startCrafting}
            onCancel={cancelCrafting}
            onClose={closeCraftingTable}
        />
    );
};
