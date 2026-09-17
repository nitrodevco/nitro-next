import { useAvatarEditorStoreApi } from '../useAvatarEditorStoreApi';

/**
 * Zustand actions are created once and never change, so they are read off the store rather than
 * subscribed to: a component using these re-renders for nothing.
 */
export const useAvatarEditorActions = () => {
    const state = useAvatarEditorStoreApi().getState();

    return {
        setActiveCategory: state.setActiveCategory,
        setActiveSubType: state.setActiveSubType,
        setWardrobeVisible: state.setWardrobeVisible,
        loadFigure: state.loadFigure,
        resetFigure: state.resetFigure,
        clearFigure: state.clearFigure,
        setPart: state.setPart,
        removePart: state.removePart,
        setColors: state.setColors,
        setGender: state.setGender,
        setFigureSetIds: state.setFigureSetIds,
        setWardrobe: state.setWardrobe,
        setWardrobeSlot: state.setWardrobeSlot,
    };
};
