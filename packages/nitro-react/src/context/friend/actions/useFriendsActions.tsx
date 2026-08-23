import { useShallow } from 'zustand/shallow';

import { useFriendsContext } from '../useFriendsContext';

export const useFriendsActions = () => useFriendsContext(useShallow(x => ({
    setTooltip: x.setTooltip,
    setListSearchValue: x.setListSearchValue,
    setFilterValue: x.setFilterValue,
    setSelectedFriendIds: x.setSelectedFriendIds,
    setRelationshipDropdownId: x.setRelationshipDropdownId,
    toggleListSearchInput: x.toggleListSearchInput,
    toggleSelectedFriendId: x.toggleSelectedFriendId,
    tooltipHandlers: x.tooltipHandlers,
})));
