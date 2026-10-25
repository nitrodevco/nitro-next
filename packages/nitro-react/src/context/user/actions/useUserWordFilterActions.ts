/**
 * `UserWordFilterSlice`'s one view-side action: which row of the word filter list is selected. The
 * list itself changes only from the server's answers. Read off the store once: a component using
 * these re-renders for nothing.
 */
import { userStore } from '../store/UserStore';

const state = userStore.getState();

const actions = {
    setSelectedWordIndex: state.setSelectedWordIndex,
};

export const useUserWordFilterActions = () => actions;
