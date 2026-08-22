import { useShallow } from "zustand/shallow";

import { useNavigatorContext } from '#base/context';

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
    searchText: x.searchText,
    searchTextCarry: x.searchTextCarry,
    leftPaneHidden: x.leftPaneHidden,
    isSearching: x.isSearching,
    currentRoom: x.currentRoom,
    currentRoomIsOwner: x.currentRoomIsOwner,
    favoriteRoomIds: x.favoriteRoomIds,
    homeRoomId: x.homeRoomId,
    groupDetails: x.groupDetails,
    roomInfoPopup: x.roomInfoPopup,
    createRoomOpen: x.createRoomOpen,
    alert: x.alert,
    doorbell: x.doorbell,
    passwordPrompt: x.passwordPrompt,
    forwardConfirm: x.forwardConfirm
})));
