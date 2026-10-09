import { AvatarEditorCategory } from '@nitrodevco/nitro-api';
import { FigureSetIdsEventMessage, UserNftWardrobeMessage, UserNftWardrobeSelectionMessage, WardrobeMessage } from '@nitrodevco/nitro-packets';

import { avatarEditorStore, AvatarEditorWardrobeOutfit, DEFAULT_WARDROBE_SLOTS, normalizeGender, WARDROBE_SLOTS_KEY } from '#base/context/avatar-editor';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Feeds the avatar editor from the server - Flash's `AvatarEditorMessageHandler`: the sellable
 * figure sets the user owns (gates `isSellable` parts), the wardrobe page and the NFT outfits
 * (`NftAvatarsModel.onUserNftWardrobeMessage`) with the one worn (`HabboAvatarEditor.onUserNftWardrobeMessage`). They land in the
 * one app-wide editor store, so they are fetched once and are still there the next time the
 * window opens.
 */
export const registerAvatarEditorHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setFigureSetIds, setWardrobe, setNftOutfits } = avatarEditorStore.getState();

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

        on(UserNftWardrobeMessage, data => setNftOutfits(data.nftAvatars)),

        // `HabboAvatarEditor.onUserNftWardrobeMessage`: with an NFT outfit worn, the editor shows the
        // fallback look on every tab but the NFT one (`loadFallbackFigure`, only for a look that is not empty).
        on(UserNftWardrobeSelectionMessage, (data) => {
            const { setNftSelection, activeCategory, loadFigure } = avatarEditorStore.getState();

            setNftSelection(data.currentTokenId, data.fallbackFigureString, data.fallbackFigureGender);

            if ((activeCategory !== AvatarEditorCategory.Nfts) && (data.fallbackFigureString !== '')) loadFigure(data.fallbackFigureString, data.fallbackFigureGender);
        }),
    ]);
};
