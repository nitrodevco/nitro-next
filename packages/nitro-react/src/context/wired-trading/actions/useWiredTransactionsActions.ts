/**
 * The transaction windows' close buttons; paging and details requests go through
 * `wiredTradingCommands`. Read off the store once: a component using these re-renders for nothing.
 */
import { wiredTradingStore } from '../store/WiredTradingStore';

const state = wiredTradingStore.getState();

const actions = {
    hideTransactionLogs: state.hideTransactionLogs,
    hideTransactionDetails: state.hideTransactionDetails,
};

export const useWiredTransactionsActions = () => actions;
