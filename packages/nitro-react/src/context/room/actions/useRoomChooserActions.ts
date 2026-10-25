/**
 * `RoomChooserSlice`'s actions. Zustand actions are created once and never change, so they are read
 * off the store a single time here rather than subscribed to: a component using these re-renders
 * for nothing.
 */
import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

const actions = {
    setFurniChooserItems: state.setFurniChooserItems,
    setUserChooserItems: state.setUserChooserItems,
};

export const useRoomChooserActions = () => actions;
