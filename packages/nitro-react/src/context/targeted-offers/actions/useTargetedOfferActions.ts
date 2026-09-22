import { targetedOfferStore } from '../store/TargetedOfferStore';

const state = targetedOfferStore.getState();

/**
 * The one targeted offer action a view calls itself: the dialog's `onQuantityInputEvent` storing
 * the quantity it accepted. Everything that changes the view or talks to the server goes through
 * `targetedOfferCommands`. Read off the store once: a component using these re-renders for nothing.
 */
const actions = {
    setQuantity: state.setQuantity,
};

export const useTargetedOfferActions = () => actions;
