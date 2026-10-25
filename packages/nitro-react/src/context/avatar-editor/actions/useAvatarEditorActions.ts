/**
 * The avatar editor store's actions. Zustand actions are created once and never change, so they are
 * read off the store a single time here rather than subscribed to: a component using these
 * re-renders for nothing.
 */
import { avatarEditorStore } from '../store';

const state = avatarEditorStore.getState();

const actions = {
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
    setNftOutfits: state.setNftOutfits,
    setSelectedNftOutfitId: state.setSelectedNftOutfitId,
    setNftOutfit: state.setNftOutfit,
    setNftSelection: state.setNftSelection,
    setAvatarEffectType: state.setAvatarEffectType,
    pickAvatarEffectType: state.pickAvatarEffectType,
    clearAvatarEffectPicked: state.clearAvatarEffectPicked,
    setInitialised: state.setInitialised,
    lendToBooth: state.lendToBooth,
    returnFromBooth: state.returnFromBooth,
};

export const useAvatarEditorActions = () => actions;
