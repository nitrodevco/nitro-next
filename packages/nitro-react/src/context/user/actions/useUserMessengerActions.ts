/**
 * `UserFriendsSlice`'s actions: friend limits, categories, friends and requests, the friend list
 * tabs, the search tab's results and the friend bar's notifications. Read off the store once: a
 * component using these re-renders for nothing.
 */
import { userStore } from '../store/UserStore';

const state = userStore.getState();

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
