/**
 * The hint manager's actions - registering an element under a key and showing or hiding the arrow
 * at it. Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
import { hintStore } from '../store/HintStore';

const state = hintStore.getState();

const actions = {
    registerHintWindow: state.registerHintWindow,
    unregisterHintWindow: state.unregisterHintWindow,
    setHintWindowNode: state.setHintWindowNode,
    showHint: state.showHint,
    hideHint: state.hideHint,
    hideMatchingHint: state.hideMatchingHint,
};

export const useHintActions = () => actions;
