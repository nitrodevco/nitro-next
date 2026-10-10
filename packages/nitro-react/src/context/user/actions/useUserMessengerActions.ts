import { userStore } from '../store/UserStore';

const state = userStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setFriendLimits: state.setFriendLimits,
    setFriendCategories: state.setFriendCategories,
    processFriends: state.processFriends,
    processFriendUpdates: state.processFriendUpdates,
    processFriendRequests: state.processFriendRequests,
    replaceFriendRequests: state.replaceFriendRequests,
    setFriendRequestsState: state.setFriendRequestsState,
    clearAnsweredFriendRequests: state.clearAnsweredFriendRequests,
    markFriendRequestsListShown: state.markFriendRequestsListShown,
    setFriendListTabHighlighted: state.setFriendListTabHighlighted,
    setSearchResults: state.setSearchResults,
    addFriendBarNotification: state.addFriendBarNotification,
    clearViewedFriendBarNotifications: state.clearViewedFriendBarNotifications,
};

export const useUserMessengerActions = () => actions;
