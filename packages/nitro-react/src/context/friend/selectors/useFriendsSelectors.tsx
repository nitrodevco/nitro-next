import { useShallow } from "zustand/shallow";

import { useFriendsContext } from "../useFriendsContext";

export const useFriendsSelectors = () => useFriendsContext(useShallow(x => ({
    activeTab: x.activeTab,
    tooltip: x.tooltip,
    showListSearchInput: x.showListSearchInput,
    listSearchValue: x.listSearchValue,
    filterValue: x.filterValue,
    selectedFriendIds: x.selectedFriendIds,
    relationshipDropdownId: x.relationshipDropdownId
})));