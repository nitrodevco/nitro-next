import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    getUserDataByIndex: state.getUserByRoomObjectId,
    updateUsers: state.updateUsers,
    updateUser: state.updateUser,
    updateUserPartial: state.updateUserPartial,
    removeUser: state.removeUser,
    setBadges: state.setBadges,
};

export const useRoomUsersActions = () => actions;
