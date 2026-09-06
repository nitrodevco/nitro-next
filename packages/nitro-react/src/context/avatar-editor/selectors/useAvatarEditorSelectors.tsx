import { useShallow } from 'zustand/shallow';

import { useAvatarEditorContext } from '../useAvatarEditorContext';

export const useAvatarEditorSelectors = () => useAvatarEditorContext(useShallow(x => ({
    activeCategory: x.activeCategory,
    activeSubType: x.activeSubType,
    wardrobeVisible: x.wardrobeVisible,
    figure: x.figure,
    parts: x.parts,
    gender: x.gender,
    figureSetIds: x.figureSetIds,
    wardrobe: x.wardrobe,
})));
