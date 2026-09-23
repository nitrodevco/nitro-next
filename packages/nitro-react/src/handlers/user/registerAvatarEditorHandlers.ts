import { FigureSetIdsEventMessage, WardrobeMessage } from '@nitrodevco/nitro-packets';

import { avatarEditorStore, AvatarEditorWardrobeOutfit, DEFAULT_WARDROBE_SLOTS, normalizeGender, WARDROBE_SLOTS_KEY } from '#base/context/avatar-editor';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Feeds the avatar editor from the server - Flash's `AvatarEditorMessageHandler`: the sellable
 * figure sets the user owns (gates `isSellable` parts) and the wardrobe page. Both land in the
 * one app-wide editor store, so they are fetched once and are still there the next time the
 * window opens.
 */
export const registerAvatarEditorHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setFigureSetIds, setWardrobe } = avatarEditorStore.getState();

    return subscribeAll(subscribe, [
        on(FigureSetIdsEventMessage, (data) => {
            setFigureSetIds(data.figureSetIds, data.boundFurnitureNames);
        }),

        on(WardrobeMessage, (data) => {
            const maxSlots = Number(systemStore.getState().config[WARDROBE_SLOTS_KEY]) || DEFAULT_WARDROBE_SLOTS;
            const wardrobe: AvatarEditorWardrobeOutfit[] = Array.from({ length: maxSlots }, () => null);

            for (const outfit of data.outfits) {
                const index = outfit.slotId - 1;

                if (index >= 0 && index < wardrobe.length) wardrobe[index] = { figure: outfit.figure, gender: normalizeGender(outfit.gender) };
            }

            setWardrobe(wardrobe);
        }),
    ]);
};
