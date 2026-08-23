import { useShallow } from 'zustand/shallow';

import { useNavigatorContext } from '../useNavigatorContext';

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
    toggleCollapsedCategory: x.toggleCollapsedCategory,
    toggleExpandedCategory: x.toggleExpandedCategory,
    setFilterType: x.setFilterType,
    setLeftPaneHidden: x.setLeftPaneHidden,
    setViewMode: x.setViewMode,
    setSearchFilter: x.setSearchFilter,
    setIsSearching: x.setIsSearching,
    setCurrentRoom: x.setCurrentRoom,
    resetNavigator: x.resetNavigator,
})));
