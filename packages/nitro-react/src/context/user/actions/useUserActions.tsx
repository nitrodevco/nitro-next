import { userStore } from '../store/UserStore';

const state = userStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setTags: state.setTags,
    setRights: state.setRights,
    setNoobnessLevel: state.setNoobnessLevel,
    increasePetRespects: state.increasePetRespects,
    decreasePetRespects: state.decreasePetRespects,
    setChatPreferences: state.setChatPreferences,
    setPreferredChatStyle: state.setPreferredChatStyle,
    setFreeFlowChatDisabled: state.setFreeFlowChatDisabled,
    setUiFlags: state.setUiFlags,
    setUiFlag: state.setUiFlag,
};

export const useUserActions = () => actions;
