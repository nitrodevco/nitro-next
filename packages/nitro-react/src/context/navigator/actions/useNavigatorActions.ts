/**
 * The navigator store's actions. Zustand actions are created once and never change, so they are
 * read off the store a single time here rather than subscribed to: a component using these
 * re-renders for nothing.
 */
import { navigatorStore } from '../store/NavigatorStore';

const state = navigatorStore.getState();

const actions = {
    setTopLevelContexts: state.setTopLevelContexts,
    setTopLevelContext: state.setTopLevelContext,
    setSavedSearches: state.setSavedSearches,
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
    setEnteredRoom: state.setEnteredRoom,
    updateEnteredRoom: state.updateEnteredRoom,
    setRoomRating: state.setRoomRating,
    setRoomFavourite: state.setRoomFavourite,
    setFavouriteRooms: state.setFavouriteRooms,
    recordRoomVisit: state.recordRoomVisit,
    renameRoomVisit: state.renameRoomVisit,
    stepRoomVisitHistory: state.stepRoomVisitHistory,
    setWindowGeometry: state.setWindowGeometry,
    setRoomEventInfoExpanded: state.setRoomEventInfoExpanded,
    setRoomEventSettingsVisible: state.setRoomEventSettingsVisible,
    setEnforceCategorySelectionType: state.setEnforceCategorySelectionType,
    setRoomFilterSelectedIndex: state.setRoomFilterSelectedIndex,
};

export const useNavigatorActions = () => actions;
