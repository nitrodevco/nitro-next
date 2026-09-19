import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setSelectedAvatarId: state.setSelectedAvatarId,
    setSelectedObjectId: state.setSelectedObjectId,
    setSelectedObjectCategory: state.setSelectedObjectCategory,
    setSelectedObject: state.setSelectedObject,
    setPlacedObject: state.setPlacedObject,
    setObjectPlacementSource: state.setObjectPlacementSource,
};

export const useRoomSelectedObjectActions = () => actions;
