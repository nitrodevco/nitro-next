import { useShallow } from "zustand/shallow";

import { useNavigatorContext } from "../useNavigatorContext";

export const useNavigatorActions = () => useNavigatorContext(useShallow(x => ({
    setTopLevelContexts: x.setTopLevelContexts,
    setTopLevelContext: x.setTopLevelContext,
    setSavedSearches: x.setSavedSearches,
    setPerks: x.setPerks,
    setPreferences: x.setPreferences,
    setFlatCategories: x.setFlatCategories,
    setEventCategories: x.setEventCategories,
    setSearchResult: x.setSearchResult,
    setCollapsedCategories: x.setCollapsedCategories,
    setCategoryCollapsed: x.setCategoryCollapsed,
    setBlockExpanded: x.setBlockExpanded,
    pushSearchContext: x.pushSearchContext,
    popPreviousSearchContext: x.popPreviousSearchContext,
    setFilterType: x.setFilterType,
    setLeftPaneHidden: x.setLeftPaneHidden,
    setViewMode: x.setViewMode,
    setIsSearching: x.setIsSearching,
    setCurrentRoom: x.setCurrentRoom,
    setFavoriteRoomIds: x.setFavoriteRoomIds,
    setRoomFavorite: x.setRoomFavorite,
    setHomeRoomId: x.setHomeRoomId,
    setGroupDetails: x.setGroupDetails,
    showRoomInfoPopup: x.showRoomInfoPopup,
    hideRoomInfoPopup: x.hideRoomInfoPopup,
    showCreateRoom: x.showCreateRoom,
    hideCreateRoom: x.hideCreateRoom,
    showAlert: x.showAlert,
    hideAlert: x.hideAlert,
    resetNavigator: x.resetNavigator
})));
