/**
 * The game tokens store's actions. Zustand actions are created once and never change, so they are
 * read off the store a single time here rather than subscribed to: a component using these
 * re-renders for nothing.
 */
import { gameTokensStore } from '../store';

const state = gameTokensStore.getState();

const actions = {
    setGameTokensOffers: state.setGameTokensOffers,
    setConfirmationRequest: state.setConfirmationRequest,
};

export const useGameTokensActions = () => actions;
