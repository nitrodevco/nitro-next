/**
 * `ModerationStore`'s actions - the tool windows shown, moved and closed, the classification lists,
 * and the moderator's selection. Read off the store once: a component using these re-renders for nothing.
 */
import { moderationStore } from '../store/ModerationStore';

const state = moderationStore.getState();

const actions = {
    showWindow: state.showWindow,
    moveWindow: state.moveWindow,
    placeFrame: state.placeFrame,
    closeWindow: state.closeWindow,
    closeClassification: state.closeClassification,
    userSelected: state.userSelected,
};

export const useModerationActions = () => actions;
