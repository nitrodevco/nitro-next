/**
 * The raid protection window's action - keeping the draft of its controls as the user changes them.
 * Zustand actions are created once and never change, so they are read off the store a single time
 * here rather than subscribed to: a component using these re-renders for nothing.
 */
import { raidProtectionStore } from '../store/RaidProtectionStore';

const state = raidProtectionStore.getState();

const actions = {
    setDraft: state.setDraft,
};

export const useRaidProtectionActions = () => actions;
