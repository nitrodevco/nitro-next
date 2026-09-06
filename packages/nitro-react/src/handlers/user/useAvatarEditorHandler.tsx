import { FigureSetIdsEventMessage, WardrobeMessage } from '@nitrodevco/nitro-packets';

import { useAvatarEditorActions } from '#base/context/avatar-editor';
import { normalizeGender } from '#base/context/avatar-editor/store';
import { useMessageListener } from '#base/hooks';

/**
 * Feeds the avatar editor store from the server: the sellable figure sets the user owns
 * (gates `isSellable` parts) and the wardrobe page. Mounted inside the editor's own context
 * provider (see components/avatar-editor), so it only listens while the editor exists.
 */
export const useAvatarEditorHandler = (maxWardrobeSlots: number) => {
    const { setFigureSetIds, setWardrobe } = useAvatarEditorActions();

    useMessageListener(FigureSetIdsEventMessage, (data) => {
        setFigureSetIds(data.figureSetIds, data.boundFurnitureNames);
    });

    useMessageListener(WardrobeMessage, (data) => {
        const wardrobe = Array.from({ length: maxWardrobeSlots }, () => null as { figure: string; gender: ReturnType<typeof normalizeGender> } | null);

        for (const outfit of data.outfits) {
            const index = outfit.slotId - 1;

            if (index >= 0 && index < wardrobe.length) wardrobe[index] = { figure: outfit.figure, gender: normalizeGender(outfit.gender) };
        }

        setWardrobe(wardrobe);
    });
};
