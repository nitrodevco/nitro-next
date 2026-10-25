/**
 * The avatar editor's `save` - `AvatarEditorView.windowEventProc`'s `save` and
 * `HabboAvatarEditor.saveCurrentSelection`: the look (a booth's outfit, a picked NFT outfit or the
 * figure) is saved and the editor closed, and the button is disabled for `SAVE_TIMEOUT_MS` after
 * every press. `hide` closes the editor; `saveEffect` is the effects tab's part of the save
 * (`useAvatarEditorEffects`).
 */
import { useEffect, useState } from 'react';

import { hasAvatarEditorInvalidClubItems, hasAvatarEditorInvalidSellableItems, openClubCenter, saveAvatarFigure, saveClothingChangeOutfit, wearNftOutfit } from '#base/commands';
import { useAvatarEditorActions, useAvatarEditorStore } from '#base/context/avatar-editor';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useWindowActions, useWindowParams } from '#base/context/system';
import { useOwnClubLevel } from '#base/context/user';

/** `AvatarEditorView.SAVE_TIMEOUT_MS`. */
const SAVE_TIMEOUT_MS = 1500;

export const useAvatarEditorSave = (hide: () => void, saveEffect: () => void) => {
    const clubLevel = useOwnClubLevel();
    const { clothingChange } = useWindowParams('avatar_editor');
    const figure = useAvatarEditorStore(x => x.figure);
    const gender = useAvatarEditorStore(x => x.gender);
    const selectedNftOutfitId = useAvatarEditorStore(x => x.selectedNftOutfitId);
    const nftCurrentTokenId = useAvatarEditorStore(x => x.nftCurrentTokenId);
    const { setSelectedNftOutfitId, setNftSelection } = useAvatarEditorActions();
    // `startSellablePurchase`: the catalogue page `catalog.clothes.page` names.
    const clothesPage = useConfigValue<string>('catalog.clothes.page');
    const { showWindow } = useWindowActions();
    const { send } = useWebSocketContext();
    // `SAVE_TIMEOUT_MS`: `save` is disabled for a moment after every press.
    const [ saveLocked, setSaveLocked ] = useState(false);

    /*
     * `windowEventProc`'s `save`, disabled for `SAVE_TIMEOUT_MS` whatever it does: a sellable item the
     * user does not own opens the catalogue's clothes page (`startSellablePurchase`), a club item above
     * the user's club level the club centre (`openHabboClubAdWindow`) - neither saves. Otherwise
     * `saveCurrentSelection()` then `manager.close()`. While the editor dresses a booth the look
     * belongs to that furni: it keeps one outfit per gender, and the gender travels with the look.
     */
    /** `catalog.openCatalogPage(catalog.clothes.page)`: without the page, the catalogue as it opens (its front page). */
    const openClothesPage = () => showWindow('catalog', { pageName: clothesPage ?? '' });

    const saveFigure = () => {
        setSaveLocked(true);

        if (hasAvatarEditorInvalidSellableItems()) {
            openClothesPage();

            return;
        }

        if (hasAvatarEditorInvalidClubItems(clubLevel)) {
            openClubCenter(send);

            return;
        }

        if (clothingChange) {
            saveClothingChangeOutfit(send, clothingChange.objectId, gender, figure);
        } else if (selectedNftOutfitId !== null) {
            // `saveCurrentSelection`: a picked NFT outfit is worn by its id, and the worn one asked for again.
            wearNftOutfit(send, selectedNftOutfitId);
            setSelectedNftOutfitId(null);
        } else {
            saveAvatarFigure(send, figure, gender);
        }

        // `hasNftOutfit()`: the worn outfit is forgotten until the server answers again.
        if (!clothingChange && (nftCurrentTokenId !== null)) setNftSelection(null);

        saveEffect();
        hide();
    };

    useEffect(() => {
        if (!saveLocked) return;

        const timer = setTimeout(() => setSaveLocked(false), SAVE_TIMEOUT_MS);

        return () => clearTimeout(timer);
    }, [ saveLocked ]);

    return { saveLocked, saveFigure, openClothesPage };
};
