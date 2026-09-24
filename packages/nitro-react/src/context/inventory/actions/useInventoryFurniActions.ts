import { inventoryStore } from '../store/InventoryStore';

const state = inventoryStore.getState();

/**
 * The furni page's actions a view may call itself: picking a group, what the search box and the two
 * dropmenus choose (`FurniView.updateGridFilters` / `resetFilters`), and, when the page goes,
 * `FurniModel.closingInventoryView`'s `resetUnseenItems`. Requesting the list and offering to a
 * trade talk to the server and go through `inventoryCommands`. Read off the store once: a component
 * using these re-renders for nothing.
 */
const actions = {
    selectFurniGroup: state.selectFurniGroup,
    resetFurniUnseenItems: state.resetFurniUnseenItems,
    setFurniFilterMain: state.setFurniFilterMain,
    setFurniFilterType: state.setFurniFilterType,
    setFurniFilterText: state.setFurniFilterText,
    resetFurniFilters: state.resetFurniFilters,
};

export const useInventoryFurniActions = () => actions;
