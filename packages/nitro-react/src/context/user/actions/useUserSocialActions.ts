/**
 * `UserSocialSlice`'s view-side actions: noting a friend request as sent, and spending a respect
 * (`SessionDataManager.giveRespect`). Read off the store once: a component using these re-renders
 * for nothing.
 */
import { userStore } from '../store/UserStore';

const state = userStore.getState();

const actions = {
    markFriendRequestSent: state.markFriendRequestSent,
    spendRespect: state.spendRespect,
};

export const useUserSocialActions = () => actions;
