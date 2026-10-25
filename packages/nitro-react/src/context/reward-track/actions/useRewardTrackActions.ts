/**
 * The reward track store's actions. Zustand actions are created once and never change, so they are
 * read off the store a single time here rather than subscribed to: a component using these
 * re-renders for nothing.
 */
import { rewardTrackStore } from '../store';

const state = rewardTrackStore.getState();

const actions = {
    setTracks: state.setTracks,
    updateTrack: state.updateTrack,
    showTrack: state.showTrack,
    hideTrack: state.hideTrack,
    setPremiumConfirmationTrackId: state.setPremiumConfirmationTrackId,
    notePremiumPurchaseFailed: state.notePremiumPurchaseFailed,
};

export const useRewardTrackActions = () => actions;
