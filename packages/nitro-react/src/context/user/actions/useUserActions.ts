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
    setRoomCameraFollowDisabled: state.setRoomCameraFollowDisabled,
    setRoomInvitesIgnored: state.setRoomInvitesIgnored,
    setOnlineIndicatorPreference: state.setOnlineIndicatorPreference,
    setUiFlag: state.setUiFlag,
    setNftChatStyles: state.setNftChatStyles,
    setPurchasableChatStyles: state.setPurchasableChatStyles,
    setPurchasableChatStyleOwned: state.setPurchasableChatStyleOwned,
    setBuildersClubSubscription: state.setBuildersClubSubscription,
    decreaseBuildersClubSecondsLeft: state.decreaseBuildersClubSecondsLeft,
};

export const useUserActions = () => actions;
