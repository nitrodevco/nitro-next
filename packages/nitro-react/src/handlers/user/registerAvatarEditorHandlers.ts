import { FigureSetIdsEventMessage, WardrobeMessage } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { AvatarEditorStore, normalizeGender } from '#base/context/avatar-editor/store';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Feeds the avatar editor store from the server: the sellable figure sets the user owns
 * (gates `isSellable` parts) and the wardrobe page. The editor makes a fresh store each time it
 * opens, so the store is handed in, and the editor registers this for as long as it is open.
 */
export const registerAvatarEditorHandlers = ({ subscribe }: WebSocketConnection, store: StoreApi<AvatarEditorStore>, maxWardrobeSlots: number) => {
    const { setFigureSetIds, setWardrobe } = store.getState();

    return subscribeAll(subscribe, [
        on(FigureSetIdsEventMessage, (data) => {
            setFigureSetIds(data.figureSetIds, data.boundFurnitureNames);
        }),

        on(WardrobeMessage, (data) => {
            const wardrobe = Array.from({ length: maxWardrobeSlots }, () => null as { figure: string; gender: ReturnType<typeof normalizeGender> } | null);

            for (const outfit of data.outfits) {
                const index = outfit.slotId - 1;

                if (index >= 0 && index < wardrobe.length) wardrobe[index] = { figure: outfit.figure, gender: normalizeGender(outfit.gender) };
            }

            setWardrobe(wardrobe);
        }),
    ]);
};
