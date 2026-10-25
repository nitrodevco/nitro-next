import { AvatarEditorCategory } from '@nitrodevco/nitro-api';
import {
    AvatarEffectActivatedMessage, AvatarEffectExpiredMessage, AvatarEffectMessage, AvatarEffectSelectedMessage, FigureSetIdsEventMessage, HotLooksMessage, UserNftWardrobeMessage, UserNftWardrobeSelectionMessage, WardrobeMessage,
} from '@nitrodevco/nitro-packets';

import { avatarEditorStore, AvatarEditorWardrobeOutfit, DEFAULT_WARDROBE_SLOTS, normalizeGender, WARDROBE_SLOTS_KEY } from '#base/context/avatar-editor';
import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';
import { configInteger } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Feeds the avatar editor from the server - Flash's `AvatarEditorMessageHandler`: the sellable
 * figure sets the user owns (gates `isSellable` parts), the wardrobe page and the NFT outfits
 * (`NftAvatarsModel.onUserNftWardrobeMessage`) with the one worn (`HabboAvatarEditor.onUserNftWardrobeMessage`). They land in the
 * one app-wide editor store, so they are fetched once and are still there the next time the
 * window opens.
 *
 * The effect the preview wears (`figureData.avatarEffectType`) follows the server's effect messages
 * as the handler's `onAvatarEffectActivated`, `onAvatarEffectExpired` (only for the effect worn),
 * `onRoomAvatarEffects` (only for the user's own avatar in the room) and `onAvatarEffectSelected`
 * set it; the preview redraws from the store (`figureData.updateView`).
 */
export const registerAvatarEditorHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setFigureSetIds, setWardrobe, setNftOutfits, setHotLooks, setAvatarEffectType } = avatarEditorStore.getState();

    return subscribeAll(subscribe, [
        on(FigureSetIdsEventMessage, (data) => {
            setFigureSetIds(data.figureSetIds, data.boundFurnitureNames);
        }),

        on(WardrobeMessage, (data) => {
            const maxSlots = Math.max(0, configInteger(WARDROBE_SLOTS_KEY, DEFAULT_WARDROBE_SLOTS));
            const wardrobe: AvatarEditorWardrobeOutfit[] = Array.from({ length: maxSlots }, () => null);

            for (const outfit of data.outfits) {
                const index = outfit.slotId - 1;

                if (index >= 0 && index < wardrobe.length) wardrobe[index] = { figure: outfit.figure, gender: normalizeGender(outfit.gender) };
            }

            setWardrobe(wardrobe);
        }),

        on(UserNftWardrobeMessage, data => setNftOutfits(data.nftAvatars)),

        on(AvatarEffectActivatedMessage, data => setAvatarEffectType(data.type)),

        on(AvatarEffectExpiredMessage, (data) => {
            if (avatarEditorStore.getState().avatarEffectType === data.type) setAvatarEffectType(-1);
        }),

        on(AvatarEffectMessage, (data) => {
            const { room, ownRoomIndex } = roomStore.getState();

            if (room && (data.objectId === ownRoomIndex)) setAvatarEffectType(data.effectId);
        }),

        on(AvatarEffectSelectedMessage, data => setAvatarEffectType(data.type)),

        // `HotLooksModel.onHotLooksMessage`: each look filed under its gender.
        on(HotLooksMessage, data => setHotLooks(data.hotLooks.map(look => ({ figure: look.figureString, gender: normalizeGender(look.gender) })))),

        // `HabboAvatarEditor.onUserNftWardrobeMessage`: with an NFT outfit worn, the editor shows the
        // fallback look on every tab but the NFT one (`loadFallbackFigure`, only for a look that is not empty).
        on(UserNftWardrobeSelectionMessage, (data) => {
            const { setNftSelection, activeCategory, loadFigure } = avatarEditorStore.getState();

            setNftSelection(data.currentTokenId, data.fallbackFigureString, data.fallbackFigureGender);

            if ((activeCategory !== AvatarEditorCategory.Nfts) && (data.fallbackFigureString !== '')) loadFigure(data.fallbackFigureString, data.fallbackFigureGender);
        }),
    ]);
};
