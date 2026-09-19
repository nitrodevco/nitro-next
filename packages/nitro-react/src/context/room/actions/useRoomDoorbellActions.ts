import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    addDoorbellUser: state.addDoorbellUser,
    removeDoorbellUser: state.removeDoorbellUser,
};

export const useRoomDoorbellActions = () => actions;
