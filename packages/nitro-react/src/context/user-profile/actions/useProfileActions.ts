/** Stable actions for the singleton profile store. */
import { profileStore } from '../store';

const state = profileStore.getState();

const actions = {
    clearProfile: state.clearProfile,
    markFriendRequestSent: state.markFriendRequestSent,
    selectGroup: state.selectGroup,
    setBadges: state.setBadges,
    setProfile: state.setProfile,
    setRelationships: state.setRelationships,
};

export const useProfileActions = () => actions;
