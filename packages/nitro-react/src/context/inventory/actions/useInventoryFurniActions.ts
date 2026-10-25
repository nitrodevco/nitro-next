/**
 * The furni page's actions a view may call itself: picking a group and paging through its items
 * (`showNextPreviewItem`), what the search box and the two dropmenus choose
 * (`FurniView.updateGridFilters` / `resetFilters`). Requesting the list, offering to a trade and
 * resetting the unseen items talk to the server and go through `inventoryCommands` /
 * `inventoryUnseenCommands`. Read off the store once: a component using these re-renders for
 * nothing.
 */
import { inventoryStore } from '../store/InventoryStore';

const state = inventoryStore.getState();

const actions = {
    selectFurniGroup: state.selectFurniGroup,
    setFurniSelectedItemIndex: state.setFurniSelectedItemIndex,
    setFurniFilterMain: state.setFurniFilterMain,
    setFurniFilterType: state.setFurniFilterType,
    setFurniFilterText: state.setFurniFilterText,
    resetFurniFilters: state.resetFurniFilters,
};

export const useInventoryFurniActions = () => actions;
