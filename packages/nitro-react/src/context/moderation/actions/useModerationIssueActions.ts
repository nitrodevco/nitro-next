/**
 * `ModerationIssueStore`'s actions a view takes - the issue browser shown and its tab, a bundle's
 * handler opened and closed. Picking, releasing and the handler's saved place send packets, so they
 * are commands (`moderationCommands`). Read off the store once.
 */
import { moderationIssueStore } from '../store/ModerationIssueStore';

const state = moderationIssueStore.getState();

const actions = {
    showBrowser: state.showBrowser,
    setBrowserTab: state.setBrowserTab,
    handleBundle: state.handleBundle,
    removeHandler: state.removeHandler,
};

export const useModerationIssueActions = () => actions;
