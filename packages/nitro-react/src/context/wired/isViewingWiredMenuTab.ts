import { wiredStore } from './store/WiredStore';

/** Whether `tabId` is being viewed: the WIRED menu is up and the tab is the active one (`isViewing`). */
export const isViewingWiredMenuTab = (tabId: string): boolean => {
    const { menuViewing, menuActiveTab } = wiredStore.getState();

    return menuViewing && (menuActiveTab === tabId);
};
