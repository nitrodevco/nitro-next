/**
 * The contract slice's actions: the rule editors of the contract windows and the element window.
 * Saving goes through `wiredTradingCommands`. Read off the store once: a component using these
 * re-renders for nothing.
 */
import { wiredTradingStore } from '../store/WiredTradingStore';

const state = wiredTradingStore.getState();

const actions = {
    closeContract: state.closeContract,
    addContractGiveRule: state.addContractGiveRule,
    removeContractGiveRule: state.removeContractGiveRule,
    addContractNode: state.addContractNode,
    updateContractNode: state.updateContractNode,
    removeContractNode: state.removeContractNode,
    setContractElementEdit: state.setContractElementEdit,
};

export const useWiredContractActions = () => actions;
