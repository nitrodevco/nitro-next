/**
 * The messenger store's action a view calls itself - how far the avatar strip has scrolled. Zustand
 * actions are created once and never change, so they are read off the store a single time here
 * rather than subscribed to: a component using these re-renders for nothing.
 */
import { messengerStore } from '../store';

const state = messengerStore.getState();

const actions = {
    setAvatarScrollOffset: state.setAvatarScrollOffset,
};

export const useMessengerActions = () => actions;
