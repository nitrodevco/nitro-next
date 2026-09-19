import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setHeightMap: state.setHeightMap,
    setHeightMapUpdates: state.setHeightMapUpdates,
    getTileHeight: state.getTileHeight,
    validateLocation: state.validateLocation,
};

export const useRoomStackingHeightMapActions = () => actions;
