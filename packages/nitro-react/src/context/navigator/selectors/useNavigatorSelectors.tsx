import { useShallow } from "zustand/shallow";

import { useNavigatorContext } from "../useNavigatorContext";

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
    expandOverrides: x.expandOverrides,
    viewModes: x.viewModes,
    filterType: x.filterType,
    leftPaneHidden: x.leftPaneHidden,
    isSearching: x.isSearching,
    currentRoom: x.currentRoom,
    currentRoomIsOwner: x.currentRoomIsOwner,
    favoriteRoomIds: x.favoriteRoomIds,
    homeRoomId: x.homeRoomId,
    groupDetails: x.groupDetails,
    roomInfoPopup: x.roomInfoPopup,
    createRoomOpen: x.createRoomOpen,
    alert: x.alert
})));
