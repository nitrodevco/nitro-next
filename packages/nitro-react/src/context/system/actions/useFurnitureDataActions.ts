/**
 * `SystemStore`'s furniture data parsers - the floor and wall item tables and the product data, as
 * their gamedata files load. Read off the store once: a component using these re-renders for
 * nothing.
 */
import { systemStore } from '../store/SystemStore';

const state = systemStore.getState();

const actions = {
    parseFloorItems: state.parseFloorItems,
    parseWallItems: state.parseWallItems,
    parseProductData: state.parseProductData,
};

export const useFurnitureDataActions = () => actions;
