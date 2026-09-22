import { recyclerStore } from '../store/RecyclerStore';

const state = recyclerStore.getState();

/**
 * The recycler's setters. What the recycler does goes through `commands/catalogRecyclerCommands`
 * (`RecyclerLogic`'s methods); the widgets set only what the animator draws. Read off the store once: a component using these re-renders for nothing.
 */
const actions = {
    setRecyclerLocalStatus: state.setRecyclerLocalStatus,
    setRecyclerSystemStatus: state.setRecyclerSystemStatus,
    setRecyclerNextAllowedAt: state.setRecyclerNextAllowedAt,
    setRecyclerSlots: state.setRecyclerSlots,
    setRecyclerPrizes: state.setRecyclerPrizes,
    setRecyclerPrizesPending: state.setRecyclerPrizesPending,
    setRecyclerVisualization: state.setRecyclerVisualization,
    setRecyclerMachineShake: state.setRecyclerMachineShake,
    setRecyclerArrowRotation: state.setRecyclerArrowRotation,
};

export const useRecyclerActions = () => actions;
