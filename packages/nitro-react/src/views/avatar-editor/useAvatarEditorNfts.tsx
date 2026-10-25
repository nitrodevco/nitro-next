/**
 * The avatar editor's NFT outfits - `NftAvatarsModel` / `NftAvatarsView` / `NftWardrobeParamView`, and
 * the look `HabboAvatarEditor` swaps as the tab changes while an NFT outfit is worn or picked:
 * - `NftAvatarsView.update`: `nfts` holds an `Outfit` per outfit (`NftOutfit`), and picking one
 *   (`selectNftAvatar`) loads its look and names it in `collectible_avatar_info`.
 * - `AvatarEditorView.windowEventProc`'s `WE_SELECTED`: the worn outfit, the fallback look or the
 *   rollback look (`followCategory`).
 *
 * The save that wears a picked outfit: `useAvatarEditorSave`.
 */
import { AvatarEditorCategory } from '@nitrodevco/nitro-api';
import { INftWardrobeItem } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { normalizeGender, useAvatarEditorActions, useAvatarEditorStore } from '#base/context/avatar-editor';
import { useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateItem, useTemplate } from '#base/theme';

import { AvatarEditorOutfitImage } from './AvatarEditorOutfitImage';

/** `NftOutfit.initNftColors`: `button`'s colour and `outfit_gradient`'s, each plain and picked (`0` for no gradient). */
const NFT_OUTFIT_COLORS: Record<string, [ number, number, number, number ]> = {
    'habbo:avatar': [ 0xFFFF6800, 0xFFFF8823, 0, 0 ],
    'habbo:clothes': [ 0xFFA09AB3, 0xFFB3ADC5, 0, 0 ],
    'habbo:avatar_genesis': [ 0xFF1D97A7, 0xFF3CA9B9, 0xFF9430B3, 0xFFA84BC3 ],
};
const NFT_OUTFIT_DEFAULT_COLORS: [ number, number, number, number ] = [ 0xFFFFFFFF, 0xFFFFFFFF, 0, 0 ];

/** `NftWardrobeParamView.getLocalizedCollectionName` / `getCollectionTextColor`: `avatar_info_text`'s name and colour per contract. */
const NFT_COLLECTION_NAMES: Record<string, string> = {
    'habbo:avatar': 'wardrobe.token.avatar.name',
    'habbo:clothes': 'wardrobe.token.clothing.name',
    'habbo:avatar_genesis': 'wardrobe.token.crafted_avatar.name',
};
const NFT_COLLECTION_TEXT_COLORS: Record<string, number> = {
    'habbo:avatar': 0xFF8823,
    'habbo:clothes': 0xB3ADC5,
    'habbo:avatar_genesis': 0x1ACAE1,
};
const NFT_COLLECTION_DEFAULT_TEXT_COLOR = 0xFFFFFF;

/** `outfitTemplate` is the `Outfit` template each grid item is cloned from; `zoom` is `zoom.enabled`. */
export const useAvatarEditorNfts = (outfitTemplate: ReturnType<typeof useTemplate>, zoom: boolean) => {
    const { loadFigure, setNftOutfit } = useAvatarEditorActions();
    const nftOutfits = useAvatarEditorStore(x => x.nftOutfits);
    const selectedNftOutfitId = useAvatarEditorStore(x => x.selectedNftOutfitId);
    const nftCurrentTokenId = useAvatarEditorStore(x => x.nftCurrentTokenId);
    const nftFallbackFigure = useAvatarEditorStore(x => x.nftFallbackFigure);
    const nftFallbackGender = useAvatarEditorStore(x => x.nftFallbackGender);
    const nftRollbackFigure = useAvatarEditorStore(x => x.nftRollbackFigure);
    const nftRollbackGender = useAvatarEditorStore(x => x.nftRollbackGender);
    // `NftWardrobeParamView`: the outfit `collectible_avatar_info` names, until the category changes.
    const [ nftInfoOutfit, setNftInfoOutfit ] = useState<INftWardrobeItem | null>(null);
    const t = useTranslation();

    /** `NftAvatarsModel.selectNftAvatar`: an outfit with a look is put on, remembered for the save and named. */
    const selectNftOutfit = (outfit: INftWardrobeItem) => {
        if (outfit.figureString === '') return;

        setNftOutfit(outfit.id);
        loadFigure(outfit.figureString, normalizeGender(outfit.gender));
        setNftInfoOutfit(outfit);
    };

    /** `HabboAvatarEditor.loadNftFigure`: the picked outfit, else the worn one (which it then picks). */
    const loadNftFigure = () => {
        if (selectedNftOutfitId !== null) {
            const picked = nftOutfits.find(outfit => outfit.id === selectedNftOutfitId);

            if (picked) loadFigure(picked.figureString, normalizeGender(picked.gender));

            return;
        }

        if (nftCurrentTokenId === null) return;

        const worn = nftOutfits.find(outfit => outfit.tokenId === nftCurrentTokenId);

        if (!worn) return;

        setNftOutfit(worn.id);
        loadFigure(worn.figureString, normalizeGender(worn.gender));
    };

    /**
     * `AvatarEditorView.windowEventProc`'s `WE_SELECTED`, for a category just selected: the look
     * follows the tab while an NFT outfit is worn or picked (not for hot looks or effects, except
     * that effects show the worn outfit), and the outfit named is forgotten.
     */
    const followCategory = (category: AvatarEditorCategory) => {
        const hasNftOutfit = nftCurrentTokenId !== null;
        const isNfts = category === AvatarEditorCategory.Nfts;
        let fallback = false;
        let rollback = false;
        let nft = false;

        if ((category !== AvatarEditorCategory.Effects) && (category !== AvatarEditorCategory.HotLooks)) {
            if (hasNftOutfit && isNfts) nft = true;
            else if (hasNftOutfit) fallback = true;
            else if ((selectedNftOutfitId !== null) && !isNfts) rollback = true;
        }

        if (hasNftOutfit && (category === AvatarEditorCategory.Effects)) nft = true;

        setNftInfoOutfit(null);

        if (fallback) {
            // `loadFallbackFigure`: only a look that is not empty.
            if (nftFallbackFigure !== '') loadFigure(nftFallbackFigure, nftFallbackGender);
        } else if (rollback) {
            loadFigure(nftRollbackFigure, nftRollbackGender);
        } else if (nft) {
            loadNftFigure();
        }
    };

    const nftItems: TemplateItem[] = outfitTemplate
        ? nftOutfits.map((outfit) => {
                const [ background, activeBackground, gradient, activeGradient ] = NFT_OUTFIT_COLORS[outfit.contractKey] ?? NFT_OUTFIT_DEFAULT_COLORS;
                const active = outfit.id === selectedNftOutfitId;

                return {
                    key: outfit.id,
                    from: outfitTemplate,
                    bindings: {
                        '': { onPointerTap: () => selectNftOutfit(outfit) },
                        // `OutfitView`: a look-less outfit's button is disabled.
                        button: { color: active ? activeBackground : background, disabled: outfit.figureString === '' },
                        outfit_gradient: { visible: gradient !== 0, color: active ? activeGradient : gradient },
                        bitmap: {
                            children: (
                                <AvatarEditorOutfitImage
                                    figure={outfit.figureString}
                                    gender={normalizeGender(outfit.gender)}
                                    zoom={zoom}
                                />
                            ),
                        },
                    },
                };
            })
        : [];

    const bindings: TemplateBindings = {
        // `NftAvatarsView.update` - the grid, not the tab of the same name.
        'nfts_content/nfts': { items: nftItems },
        // `NftWardrobeParamView.updateView`: the contract's name (`null` for one it does not know) and the outfit's id.
        collectible_avatar_info: { visible: nftInfoOutfit !== null },
        avatar_info_text: nftInfoOutfit
            ? {
                    caption: `${(nftInfoOutfit.contractKey in NFT_COLLECTION_NAMES) ? t(NFT_COLLECTION_NAMES[nftInfoOutfit.contractKey]) : 'null'} #${nftInfoOutfit.id}`,
                    color: NFT_COLLECTION_TEXT_COLORS[nftInfoOutfit.contractKey] ?? NFT_COLLECTION_DEFAULT_TEXT_COLOR,
                }
            : {},
    };

    return { bindings, followCategory };
};
