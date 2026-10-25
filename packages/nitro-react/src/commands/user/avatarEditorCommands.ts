/**
 * What the avatar editor does about the parts and colours the user may not wear - Flash
 * `HabboAvatarEditor.hasInvalidClubItems` / `hasInvalidSellableItems` / `stripClubItems` /
 * `stripInvalidSellableItems` over its category models (`CategoryBaseModel`, `CategoryData`), on
 * the editing figure in `avatarEditorStore`.
 *
 * The categories are the editor's: generic, head, torso and legs, and misc with
 * `clothing.misc.tab.enabled` - their set types are the ones checked.
 *
 * `CategoryData.stripClubItemsOverLevel` selects the grid's first item, and the one after it when
 * that is the remove item - with `avatareditor.show.clubitems.first` that can be another club item,
 * which leaves the figure as invalid as it was. The port takes the first item of the grid the user
 * may wear instead, and removes the part when there is none and the set type is not mandatory.
 *
 * Also `HabboAvatarEditorManager.close`'s effect step (`closeAvatarEditorEffect`), and the editor's
 * requests: what it asks for as it opens, the wardrobe slots, and the save of a look, a clothing
 * booth's outfit, an NFT outfit or an effect.
 */
import { AvatarEditorCategory, AvatarFigurePartType, AvatarGenderType } from '@nitrodevco/nitro-api';
import { AvatarEffectActivatedComposer, AvatarEffectSelectedComposer, GetHotLooksComposer, GetSelectedNftWardrobeOutfitComposer, GetUserNftWardrobeComposer, GetWardrobeComposer, SaveUserNftWardrobeComposer, SaveWardrobeOutfitComposer, SetClothingChangeDataComposer, UpdateFigureDataComposer } from '@nitrodevco/nitro-packets';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';

import { avatarEditorStore } from '#base/context/avatar-editor';
import { Send } from '#base/context/communication';
import { configBoolean, systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { firstSelectableColorId, getAvatarEditorPartSets } from '#base/utils';

/** `HotLooksModel.MAXIMUM_HOT_LOOKS`. */
const HOT_LOOKS_AMOUNT = 20;

/** The set types of the editor's part categories (`getCategoryValues`). */
const CATEGORY_SET_TYPES: readonly string[] = [
    AvatarFigurePartType.Head,
    AvatarFigurePartType.Hair, AvatarFigurePartType.HeadAccessory, AvatarFigurePartType.HeadAccessoryExtra, AvatarFigurePartType.EyeAccessory, AvatarFigurePartType.FaceAccessory,
    AvatarFigurePartType.Chest, AvatarFigurePartType.ChestPrint, AvatarFigurePartType.CoatChest, AvatarFigurePartType.ChestAccessory,
    AvatarFigurePartType.Legs, AvatarFigurePartType.Shoes, AvatarFigurePartType.WaistAccessory,
];
const MISC_SET_TYPES: readonly string[] = [ AvatarFigurePartType.Pet, AvatarFigurePartType.Misc ];

const editorSetTypes = () => (configBoolean('clothing.misc.tab.enabled') ? [ ...CATEGORY_SET_TYPES, ...MISC_SET_TYPES ] : CATEGORY_SET_TYPES);

/** The editing figure's worn part set and colours for a set type, as the structure has them. */
const wornOf = (setType: string) => {
    const worn = avatarEditorStore.getState().parts[setType];
    const structure = GetAvatarRenderManager().structureData;
    const type = structure.getSetType(setType);
    const palette = type && structure.getPalette(type.paletteId);

    if (!worn || !type) return undefined;

    return { worn, type, partSet: type.getPartSet(worn.setId), colors: worn.colorIds.map(colorId => palette?.getColor(colorId)) };
};

/** `hasInvalidClubItems` (`CategoryData.hasClubSelectionsOverLevel`): a worn part or colour above the club level. */
export const hasAvatarEditorInvalidClubItems = (clubLevel: number): boolean => editorSetTypes().some((setType) => {
    const worn = wornOf(setType);

    if (!worn) return false;

    return ((worn.partSet?.clubLevel ?? 0) > clubLevel) || worn.colors.some(color => !!color && (color.clubLevel > clubLevel));
});

/** `hasInvalidSellableItems`: a worn sellable part the user does not own. */
export const hasAvatarEditorInvalidSellableItems = (): boolean => {
    const { figureSetIds } = avatarEditorStore.getState();

    return editorSetTypes().some((setType) => {
        const partSet = wornOf(setType)?.partSet;

        return !!partSet && partSet.isSellable && !figureSetIds.includes(partSet.id);
    });
};

/** A replacement for a worn part the user may not wear: the grid's first wearable part, or none. */
const replacePart = (setType: string, clubLevel: number, colorIds: number[]) => {
    const { gender, figureSetIds, setPart, removePart } = avatarEditorStore.getState();
    const type = GetAvatarRenderManager().structureData.getSetType(setType);
    const replacement = type && getAvatarEditorPartSets(type, {
        gender,
        clubLevel,
        figureSetIds,
        clubItemsFirst: configBoolean('avatareditor.show.clubitems.first'),
        clubItemsDimmed: configBoolean('avatareditor.show.clubitems.dimmed'),
    }).find(partSet => partSet.clubLevel <= clubLevel);
    const mandatory = GetAvatarRenderManager().getMandatoryAvatarPartSetIds(gender, clubLevel).includes(setType);

    if (replacement) setPart(setType, replacement.id, colorIds);
    else if (!mandatory) removePart(setType);
};

/**
 * `stripClubItems`: every worn part above the club level replaced (`stripClubItemsOverLevel`), and
 * every colour above it - or missing - the palette's first colour the user may select
 * (`stripClubColorsOverLevel`).
 */
export const stripAvatarEditorClubItems = (clubLevel: number): void => {
    for (const setType of editorSetTypes()) {
        const worn = wornOf(setType);

        if (!worn) continue;

        const defaultColor = firstSelectableColorId(setType, clubLevel);
        const colorsOver = (defaultColor !== -1) && worn.colors.some(color => !color || (color.clubLevel > clubLevel));
        const colorIds = colorsOver ? worn.colors.map(color => ((!color || (color.clubLevel > clubLevel)) ? defaultColor : color.id)) : worn.worn.colorIds;

        if ((worn.partSet?.clubLevel ?? 0) > clubLevel) replacePart(setType, clubLevel, colorIds);
        else if (colorsOver) avatarEditorStore.getState().setColors(setType, colorIds);
    }
};

/** `stripInvalidSellableItems`: every worn sellable part the user does not own replaced. */
export const stripAvatarEditorInvalidSellableItems = (clubLevel: number): void => {
    const { figureSetIds } = avatarEditorStore.getState();

    for (const setType of editorSetTypes()) {
        const worn = wornOf(setType);

        if (worn?.partSet?.isSellable && !figureSetIds.includes(worn.partSet.id)) replacePart(setType, clubLevel, worn.worn.colorIds);
    }
};

/**
 * `HabboAvatarEditorManager.close`: the editor's effect becomes the one last worn
 * (`inventory.getLastActivatedEffect()`), which the preview wears the next time it opens. A pick
 * not saved stays marked for the next save, as Flash leaves `§_-91a§` alone here.
 */
export const closeAvatarEditorEffect = (): void => {
    avatarEditorStore.getState().setAvatarEffectType(userStore.getState().lastWornEffect);
};

/**
 * The main editor taking its look back from the booth (`returnFromBooth`). When the main editor
 * existed and wore an NFT outfit, its fallback look shows and the caller loads nothing; otherwise
 * true, and the caller loads the account's own look. Read after the return, which restores the main
 * editor's NFT state.
 */
export const returnAvatarEditorFromBooth = (): boolean => {
    const { returnFromBooth, loadFigure } = avatarEditorStore.getState();
    const mainExisted = returnFromBooth();
    const { nftCurrentTokenId, nftFallbackFigure, nftFallbackGender } = avatarEditorStore.getState();

    if (mainExisted && (nftCurrentTokenId !== null)) {
        if (nftFallbackFigure !== '') loadFigure(nftFallbackFigure, nftFallbackGender);

        return false;
    }

    return true;
};

/** `HabboAvatarEditor.init` is once a session for the main editor: true the first time, which marks it. */
export const markAvatarEditorInitialised = (): boolean => {
    const { initialised, setInitialised } = avatarEditorStore.getState();

    if (initialised) return false;

    setInitialised();

    return true;
};

/**
 * `HabboAvatarEditor.init`, in its order: `sendGetSelectedNftWardrobeOutfitMessage`, the
 * `WardrobeModel`'s `getWardrobe`, then the categories as they are made - `HotLooksModel.requestHotLooks`
 * (`MAXIMUM_HOT_LOOKS`, not for a clothing change editor) and `NftAvatarsModel.requestNftAvatars`.
 */
export const requestAvatarEditorData = (send: Send, clothingChange: boolean) => {
    send(new GetSelectedNftWardrobeOutfitComposer({}));
    send(new GetWardrobeComposer({}));
    if (!clothingChange) send(new GetHotLooksComposer({ amount: HOT_LOOKS_AMOUNT }));
    send(new GetUserNftWardrobeComposer({}));
};

/** `WardrobeSlot`'s set button: the look saved into a (1-based) server slot. */
export const saveWardrobeOutfit = (send: Send, slotId: number, figure: string, gender: AvatarGenderType) => send(new SaveWardrobeOutfitComposer({ slotId, figure, gender }));

/** `HabboAvatarEditor.saveCurrentSelection` for a clothing booth: the look is the furni's, for one gender. */
export const saveClothingChangeOutfit = (send: Send, objectId: number, gender: string, figure: string) => send(new SetClothingChangeDataComposer({ objectId, gender, figure }));

/** `saveCurrentSelection` with an NFT outfit picked: worn by its id, and the worn one asked for again. */
export const wearNftOutfit = (send: Send, id: string) => {
    send(new SaveUserNftWardrobeComposer({ id }));
    send(new GetSelectedNftWardrobeOutfitComposer({}));
};

/** `saveCurrentSelection`: the look itself (`UpdateFigureDataMessageComposer`). */
export const saveAvatarFigure = (send: Send, figure: string, gender: AvatarGenderType) => send(new UpdateFigureDataComposer({ figure, gender }));

/** `HabboInventory.setEffectSelected` (`EffectsModel.useEffect`'s select, or `deselectAllEffects`' -1). */
export const selectAvatarEffect = (send: Send, effectType: number) => send(new AvatarEffectSelectedComposer({ effectType }));

/** `EffectsModel.useEffect`: an effect not running yet is switched on first. */
export const activateAvatarEffect = (send: Send, effectType: number) => send(new AvatarEffectActivatedComposer({ effectType }));

/** `AvatarEffect.subType` of a costume. */
const COSTUME_SUB_TYPE = 1;

/**
 * `CustomUserNotificationWidget`'s `buy_costumes`: the avatar editor on its effects tab when the
 * user owns a costume, else the catalogue's `costumes` page.
 */
export const openCostumes = () => {
    if (userStore.getState().avatarEffects.some(effect => effect.subType === COSTUME_SUB_TYPE)) {
        avatarEditorStore.getState().setActiveCategory(AvatarEditorCategory.Effects);
        systemStore.getState().showWindow('avatar_editor');

        return;
    }

    systemStore.getState().showWindow('catalog', { pageName: 'costumes' });
};
