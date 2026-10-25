/**
 * `UserStore`'s account actions - rights, tags, noobness, pet respects, chat and UI preferences,
 * chat styles, the Builder's Club subscription and the mystery box colours - and the effect last worn
 * (`UserEffectsSlice`). Read off the store once: a component using these re-renders for nothing.
 */
import { userStore } from '../store/UserStore';

const state = userStore.getState();

const actions = {
    setTags: state.setTags,
    setRights: state.setRights,
    setNoobnessLevel: state.setNoobnessLevel,
    increasePetRespects: state.increasePetRespects,
    decreasePetRespects: state.decreasePetRespects,
    setChatPreferences: state.setChatPreferences,
    setPreferredChatStyle: state.setPreferredChatStyle,
    setChatSizePreference: state.setChatSizePreference,
    setUiFlags: state.setUiFlags,
    setRoomToolsCollapsed: state.setRoomToolsCollapsed,
    setRoomCameraFollowDisabled: state.setRoomCameraFollowDisabled,
    setRoomInvitesIgnored: state.setRoomInvitesIgnored,
    setOnlineIndicatorPreference: state.setOnlineIndicatorPreference,
    setUiFlag: state.setUiFlag,
    setNftChatStyles: state.setNftChatStyles,
    setPurchasableChatStyles: state.setPurchasableChatStyles,
    setPurchasableChatStyleOwned: state.setPurchasableChatStyleOwned,
    setBuildersClubSubscription: state.setBuildersClubSubscription,
    decreaseBuildersClubSecondsLeft: state.decreaseBuildersClubSecondsLeft,
    setMysteryBoxKeys: state.setMysteryBoxKeys,
    setLastWornEffect: state.setLastWornEffect,
};

export const useUserActions = () => actions;
