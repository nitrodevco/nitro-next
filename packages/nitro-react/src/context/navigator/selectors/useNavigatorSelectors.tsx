import { useShallow } from 'zustand/shallow';

import { useNavigatorContext } from '../useNavigatorContext';

export const useNavigatorSelectors = () => useNavigatorContext(useShallow(x => ({
    topLevelContexts: x.topLevelContexts,
    topLevelContext: x.topLevelContext,
    savedSearches: x.savedSearches,
    perks: x.perks,
    preferences: x.preferences,
    flatCategories: x.flatCategories,
    eventCategories: x.eventCategories,
    searchResult: x.searchResult,
    collapsedCategories: x.collapsedCategories,
    expandedCategories: x.expandedCategories,
    viewModes: x.viewModes,
    searchFilter: x.searchFilter,
    filterType: x.filterType,
    leftPaneHidden: x.leftPaneHidden,
    isSearching: x.isSearching,
    currentRoom: x.currentRoom,
    currentRoomIsOwner: x.currentRoomIsOwner,
})));
