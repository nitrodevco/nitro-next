import { navigatorStore } from '../store/NavigatorStore';

const state = navigatorStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setTopLevelContexts: state.setTopLevelContexts,
    setTopLevelContext: state.setTopLevelContext,
    setSavedSearches: state.setSavedSearches,
    setPerks: state.setPerks,
    setPreferences: state.setPreferences,
    setFlatCategories: state.setFlatCategories,
    setEventCategories: state.setEventCategories,
    setSearchResult: state.setSearchResult,
    setCollapsedCategories: state.setCollapsedCategories,
    toggleCollapsedCategory: state.toggleCollapsedCategory,
    toggleExpandedCategory: state.toggleExpandedCategory,
    setFilterType: state.setFilterType,
    setLeftPaneHidden: state.setLeftPaneHidden,
    setViewMode: state.setViewMode,
    setSearchFilter: state.setSearchFilter,
    setIsSearching: state.setIsSearching,
    setRoomEntryDialog: state.setRoomEntryDialog,
    setRoomEntryDialogMode: state.setRoomEntryDialogMode,
    setAlert: state.setAlert,
    setRoomQueue: state.setRoomQueue,
    resetNavigator: state.resetNavigator,
};

export const useNavigatorActions = () => actions;
