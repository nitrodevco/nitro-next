import { specialItemsStore } from '../store/SpecialItemsStore';

const state = specialItemsStore.getState();

/**
 * The special items display's view actions - the carousel's arrows, page buttons and frames.
 * Read off the store once: a component using these re-renders for nothing.
 */
const actions = {
    showNextSpecialItem: state.showNextSpecialItem,
    showPreviousSpecialItem: state.showPreviousSpecialItem,
    showSpecialItem: state.showSpecialItem,
    stepSpecialItems: state.stepSpecialItems,
};

export const useSpecialItemsActions = () => actions;
