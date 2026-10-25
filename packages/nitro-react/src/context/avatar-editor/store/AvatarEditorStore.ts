import { AvatarEditorCategory, AvatarEditorSetType, AvatarFigurePartType, AvatarGenderType } from '@nitrodevco/nitro-api';
import type { INftWardrobeItem } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

import { buildFigureString, faceOnlyFigureString, FigureParts, normalizeGender, parseFigureString } from './figureString';

/**
 * How many wardrobe slots there are - `WardrobeModel.availableSlots`, which reads the hotel's
 * `avatareditor.wardrobe.slots` and falls back to 10.
 */
export const WARDROBE_SLOTS_KEY = 'avatareditor.wardrobe.slots';
export const DEFAULT_WARDROBE_SLOTS = 10;

/** One wardrobe slot as the server sends it (`WardrobeMessage`). */
export type AvatarEditorWardrobeOutfit = {
    figure: string;
    gender: AvatarGenderType;
} | null;

/**
 * What belongs to the main editor (Flash instance 0) rather than to the one window there is: the look it edits and where it
 * stands, set aside while a booth borrows the window.
 */
type MainEditorState = Pick<State, 'activeCategory' | 'activeSubType' | 'parts' | 'gender' | 'savedFigure' | 'savedGender' | 'selectedNftOutfitId' | 'nftRollbackFigure' | 'nftRollbackGender'> & { figure: string };

type State = {
    activeCategory: AvatarEditorCategory;
    activeSubType: Record<AvatarEditorCategory, AvatarEditorSetType>;
    /** The figure being edited, per set type. */
    parts: FigureParts;
    gender: AvatarGenderType;
    /** The figure/gender the editor opened with - the reset target. */
    savedFigure: string;
    savedGender: AvatarGenderType;
    /** Sellable figure set ids the user owns (`FigureSetIdsEventMessage`). */
    figureSetIds: number[];
    boundFurnitureNames: string[];
    /** Wardrobe slots, 1-based server slots stored 0-based; `null` = empty slot. */
    wardrobe: AvatarEditorWardrobeOutfit[];
    wardrobeVisible: boolean;
    /** `NftAvatarsModel.nftAvatars`: the user's NFT outfits (`UserNftWardrobeMessage`). */
    nftOutfits: INftWardrobeItem[];
    /** `HotLooksModel`: the hotel's hot looks (`HotLooksMessage`), each with its gender (`M` / `F`). */
    hotLooks: AvatarEditorWardrobeOutfit[];
    /** `HabboAvatarEditor._setNftOutfit`: the NFT outfit picked in the editor, which a save wears. */
    selectedNftOutfitId: string | null;
    /** `HabboAvatarEditor.setNftOutfit`: the look before the NFT outfit was picked, put back away from the NFT tab (`loadRollbackFigure`). */
    nftRollbackFigure: string;
    nftRollbackGender: string;
    /**
     * `UserNftWardrobeSelectionMessage`: the worn NFT outfit's token id (`null` until the server says,
     * and again after a save - `hasNftOutfit`), and the look to show away from the NFT tab.
     */
    nftCurrentTokenId: string | null;
    nftFallbackFigure: string;
    nftFallbackGender: string;
    /**
     * `FigureData.avatarEffectType`: the effect the preview avatar wears and the effects tab has
     * picked, -1 for none. The editor opens on the effect last worn (`getLastActivatedEffect`); a
     * pick and the server's effect messages change it (`AvatarEditorMessageHandler`).
     */
    avatarEffectType: number;
    /** `HabboAvatarEditor.§_-91a§`: an effect was picked since the last save, so the save wears it. */
    avatarEffectPicked: boolean;
    /**
     * `HabboAvatarEditor.init` ran for the main editor: it is only hidden on close
     * (`HabboAvatarEditorManager.close` case 0), so its requests go once a session.
     */
    initialised: boolean;
    /**
     * The look being edited is a booth's (`FurnitureClothingChangeWidgetHandler` opens editor instance 1, which
     * `HabboAvatarEditorManager.close` disposes), not the main editor's.
     */
    boothLook: boolean;
    /**
     * The main editor as the booth found it (instance 0 is only hidden meanwhile, so its unsaved look is still there when it
     * opens again); `null` when it had never opened - Flash has no instance 0 yet, so it starts on the user's look.
     */
    mainEditor: MainEditorState | null;
};

type Actions = {
    setActiveCategory: (activeCategory: AvatarEditorCategory) => void;
    setActiveSubType: (type: AvatarEditorSetType) => void;
    setWardrobeVisible: (wardrobeVisible: boolean) => void;

    /** Loads a figure into the editor; `asSaved` also makes it the reset target. */
    loadFigure: (figure: string, gender: string, asSaved?: boolean) => void;
    resetFigure: () => void;
    clearFigure: () => void;
    setPart: (setType: string, setId: number, colorIds: number[]) => void;
    removePart: (setType: string) => void;
    setColors: (setType: string, colorIds: number[]) => void;
    setGender: (gender: AvatarGenderType) => void;
    setFigureSetIds: (figureSetIds: number[], boundFurnitureNames: string[]) => void;
    setWardrobe: (wardrobe: AvatarEditorWardrobeOutfit[]) => void;
    setWardrobeSlot: (index: number, outfit: AvatarEditorWardrobeOutfit) => void;
    setNftOutfits: (nftOutfits: INftWardrobeItem[]) => void;
    setHotLooks: (hotLooks: AvatarEditorWardrobeOutfit[]) => void;
    setSelectedNftOutfitId: (selectedNftOutfitId: string | null) => void;
    /** `HabboAvatarEditor.setNftOutfit`: picks the outfit and keeps the current look to roll back to. */
    setNftOutfit: (id: string) => void;
    setNftSelection: (currentTokenId: string | null, fallbackFigure?: string, fallbackGender?: string) => void;
    /** `figureData.avatarEffectType = type` - what the server's effect messages and opening the editor set. */
    setAvatarEffectType: (avatarEffectType: number) => void;
    /** `HabboAvatarEditor.setAvatarEffectType`: the effects tab's pick, which the next save wears. */
    pickAvatarEffectType: (avatarEffectType: number) => void;
    /** `saveCurrentSelection`: the pick is worn, so the next save leaves effects alone. */
    clearAvatarEffectPicked: () => void;
    setInitialised: () => void;
    /** A booth borrows the window: the main editor's own state is set aside (once, however many booth looks follow). */
    lendToBooth: () => void;
    /** The main editor has the window again: its state comes back. False when it had never opened before the booth. */
    returnFromBooth: () => boolean;
};

const initialState: State = {
    activeCategory: AvatarEditorCategory.Generic,
    activeSubType: {
        [AvatarEditorCategory.Generic]: AvatarFigurePartType.Head,
        [AvatarEditorCategory.Head]: AvatarFigurePartType.Hair,
        [AvatarEditorCategory.Torso]: AvatarFigurePartType.Chest,
        [AvatarEditorCategory.Legs]: AvatarFigurePartType.Legs,
        [AvatarEditorCategory.HotLooks]: AvatarFigurePartType.None,
        [AvatarEditorCategory.Wardrobe]: AvatarFigurePartType.None,
        [AvatarEditorCategory.Nfts]: AvatarFigurePartType.None,
        [AvatarEditorCategory.Effects]: AvatarFigurePartType.None,
        [AvatarEditorCategory.Misc]: AvatarFigurePartType.Pet,
    },
    parts: {},
    gender: AvatarGenderType.Male,
    savedFigure: '',
    savedGender: AvatarGenderType.Male,
    figureSetIds: [],
    boundFurnitureNames: [],
    wardrobe: [],
    wardrobeVisible: true,
    nftOutfits: [],
    hotLooks: [],
    selectedNftOutfitId: null,
    nftRollbackFigure: '',
    nftRollbackGender: '',
    nftCurrentTokenId: null,
    nftFallbackFigure: '',
    nftFallbackGender: '',
    avatarEffectType: -1,
    avatarEffectPicked: false,
    initialised: false,
    boothLook: false,
    mainEditor: null,
};

export type AvatarEditorStore = State & Actions & {
    /** The current figure string - derived on every parts change so selectors stay shallow. */
    figure: string;
};

export const createAvatarEditorStore = () => createStore<AvatarEditorStore>()((set, get) => ({
    ...initialState,
    setActiveCategory: (activeCategory: AvatarEditorCategory) => set({ activeCategory }),
    setActiveSubType: (type: AvatarEditorSetType) => set((x) => {
        return { activeSubType: { ...x.activeSubType, [x.activeCategory]: type } };
    }),
    setWardrobeVisible: (wardrobeVisible: boolean) => set({ wardrobeVisible }),
    figure: '',
    loadFigure: (figure, gender, asSaved = false) => {
        const parts = parseFigureString(figure);
        const normalized = normalizeGender(gender);

        set({
            parts,
            figure: buildFigureString(parts),
            gender: normalized,
            ...(asSaved ? { savedFigure: figure, savedGender: normalized } : {}),
        });
    },

    resetFigure: () => {
        const { savedFigure, savedGender, loadFigure } = get();

        loadFigure(savedFigure, savedGender);
    },

    clearFigure: () => {
        const parts = parseFigureString(faceOnlyFigureString(get().parts));

        set({ parts, figure: buildFigureString(parts) });
    },

    setPart: (setType, setId, colorIds) => {
        const parts: FigureParts = { ...get().parts, [setType]: { setId, colorIds } };

        set({ parts, figure: buildFigureString(parts) });
    },

    removePart: (setType) => {
        const parts = { ...get().parts };

        delete parts[setType];
        set({ parts, figure: buildFigureString(parts) });
    },

    setColors: (setType, colorIds) => {
        const existing = get().parts[setType];

        if (!existing) return;

        const parts: FigureParts = { ...get().parts, [setType]: { ...existing, colorIds } };

        set({ parts, figure: buildFigureString(parts) });
    },

    setGender: gender => set({ gender }),
    setFigureSetIds: (figureSetIds, boundFurnitureNames) => set({ figureSetIds, boundFurnitureNames }),
    setWardrobe: wardrobe => set({ wardrobe }),
    setNftOutfits: nftOutfits => set({ nftOutfits }),
    setHotLooks: hotLooks => set({ hotLooks }),
    setSelectedNftOutfitId: selectedNftOutfitId => set({ selectedNftOutfitId }),
    setNftOutfit: id => set(state => ({ selectedNftOutfitId: id, nftRollbackFigure: state.figure, nftRollbackGender: state.gender })),
    setNftSelection: (nftCurrentTokenId, nftFallbackFigure, nftFallbackGender) => set(state => ({
        nftCurrentTokenId,
        nftFallbackFigure: nftFallbackFigure ?? state.nftFallbackFigure,
        nftFallbackGender: nftFallbackGender ?? state.nftFallbackGender,
    })),
    setAvatarEffectType: avatarEffectType => set({ avatarEffectType }),
    pickAvatarEffectType: avatarEffectType => set({ avatarEffectType, avatarEffectPicked: true }),
    clearAvatarEffectPicked: () => set({ avatarEffectPicked: false }),
    setInitialised: () => set({ initialised: true }),
    lendToBooth: () => set((state) => {
        if (state.boothLook) return {};

        const { activeCategory, activeSubType, parts, figure, gender, savedFigure, savedGender, selectedNftOutfitId, nftRollbackFigure, nftRollbackGender } = state;

        return {
            boothLook: true,
            mainEditor: state.initialised ? { activeCategory, activeSubType, parts, figure, gender, savedFigure, savedGender, selectedNftOutfitId, nftRollbackFigure, nftRollbackGender } : null,
        };
    }),
    returnFromBooth: () => {
        const { boothLook, mainEditor } = get();

        if (!boothLook) return true;

        set({ ...mainEditor, boothLook: false, mainEditor: null });

        return mainEditor !== null;
    },
    setWardrobeSlot: (index, outfit) => set((state) => {
        const wardrobe = [ ...state.wardrobe ];

        wardrobe[index] = outfit;

        return { wardrobe };
    }),
}));

/** The one editor there is; its contents outlive the window. */
export const avatarEditorStore = createAvatarEditorStore();
