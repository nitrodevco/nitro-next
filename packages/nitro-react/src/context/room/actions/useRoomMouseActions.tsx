import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    getMouseEventId: state.getMouseEventId,
    setMouseEventId: state.setMouseEventId,
    addCursorOwner: state.addCursorOwner,
    removeCursorOwner: state.removeCursorOwner,
    hasAndResetCursorUpdate: state.hasAndResetCursorUpdate,
    hasCursorOwners: state.hasCursorOwners,
};

export const useRoomMouseActions = () => actions;
