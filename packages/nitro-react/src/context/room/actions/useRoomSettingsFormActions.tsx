import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setRoomSettingsForm: state.setRoomSettingsForm,
    updateRoomSettingsForm: state.updateRoomSettingsForm,
    setRoomSettingsFormError: state.setRoomSettingsFormError,
    setRoomSettingsFormSaving: state.setRoomSettingsFormSaving,
    setRoomControllers: state.setRoomControllers,
    addRoomController: state.addRoomController,
    removeRoomController: state.removeRoomController,
    setRoomBannedUsers: state.setRoomBannedUsers,
    removeRoomBannedUser: state.removeRoomBannedUser,
};

export const useRoomSettingsFormActions = () => actions;
