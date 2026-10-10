import { raidProtectionStore } from '../store/RaidProtectionStore';

const state = raidProtectionStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setDraft: state.setDraft,
};

export const useRaidProtectionActions = () => actions;
