/**
 * `UserInfoSlice`'s actions - who you are: the user object, name, figure, safety lock and email.
 * Read off the store once: a component using these re-renders for nothing.
 */
import { userStore } from '../store/UserStore';

const state = userStore.getState();

const actions = {
    setUserInfo: state.setUserInfo,
    setName: state.setName,
    setFigure: state.setFigure,
    setAccountSafetyLocked: state.setAccountSafetyLocked,
    setEmailVerified: state.setEmailVerified,
};

export const useUserInfoActions = () => actions;
