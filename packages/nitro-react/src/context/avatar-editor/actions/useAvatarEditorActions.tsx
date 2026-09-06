import { useShallow } from 'zustand/shallow';

import { useAvatarEditorContext } from '../useAvatarEditorContext';

export const useAvatarEditorActions = () => useAvatarEditorContext(useShallow(x => ({
    setActiveCategory: x.setActiveCategory,
    setActiveSubType: x.setActiveSubType,
    setWardrobeVisible: x.setWardrobeVisible,
    loadFigure: x.loadFigure,
    resetFigure: x.resetFigure,
    clearFigure: x.clearFigure,
    setPart: x.setPart,
    removePart: x.removePart,
    setColors: x.setColors,
    setGender: x.setGender,
    setFigureSetIds: x.setFigureSetIds,
    setWardrobe: x.setWardrobe,
    setWardrobeSlot: x.setWardrobeSlot,
})));
