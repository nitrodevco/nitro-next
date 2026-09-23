import { AvatarEditorCategory, AvatarEditorSetType, AvatarFigurePartType, AvatarGenderType } from '@nitrodevco/nitro-api';
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
    setWardrobeSlot: (index, outfit) => set((state) => {
        const wardrobe = [ ...state.wardrobe ];

        wardrobe[index] = outfit;

        return { wardrobe };
    }),
}));

/** The one editor there is; its contents outlive the window. */
export const avatarEditorStore = createAvatarEditorStore();
