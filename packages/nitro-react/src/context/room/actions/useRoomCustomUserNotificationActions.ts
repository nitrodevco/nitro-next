/**
 * `RoomCustomUserNotificationSlice`'s actions. Zustand actions are created once and never change,
 * so they are read off the store a single time here rather than subscribed to: a component using
 * these re-renders for nothing.
 */
import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

const actions = {
    openCustomUserNotification: state.openCustomUserNotification,
    closeCustomUserNotification: state.closeCustomUserNotification,
};

export const useRoomCustomUserNotificationActions = () => actions;
