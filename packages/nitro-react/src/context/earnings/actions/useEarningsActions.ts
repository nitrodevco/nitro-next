/**
 * The earnings store's actions, both slices'. Zustand actions are created once and never change, so
 * they are read off the store a single time here rather than subscribed to: a component using these
 * re-renders for nothing.
 */
import { earningsStore } from '../store';

const state = earningsStore.getState();

const actions = {
    setShowingIndicator: state.setShowingIndicator,
    setAwaitingFirstStatus: state.setAwaitingFirstStatus,
    setViewCreated: state.setViewCreated,
    resetView: state.resetView,
    setElementEnabled: state.setElementEnabled,
    applyIncomeRewardData: state.applyIncomeRewardData,
    applyIncomeRewardClaimResponse: state.applyIncomeRewardClaimResponse,
};

export const useEarningsActions = () => actions;
