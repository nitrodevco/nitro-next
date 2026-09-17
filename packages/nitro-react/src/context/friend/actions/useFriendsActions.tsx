import { useFriendsStoreApi } from '../useFriendsStoreApi';

/**
 * Zustand actions are created once and never change, so they are read off the store rather than
 * subscribed to: a component using these re-renders for nothing.
 */
export const useFriendsActions = () => {
    const state = useFriendsStoreApi().getState();

    return {
        setTooltip: state.setTooltip,
        setListSearchValue: state.setListSearchValue,
        setFilterValue: state.setFilterValue,
        setSelectedFriendIds: state.setSelectedFriendIds,
        setRelationshipDropdownId: state.setRelationshipDropdownId,
        toggleListSearchInput: state.toggleListSearchInput,
        toggleSelectedFriendId: state.toggleSelectedFriendId,
        tooltipHandlers: state.tooltipHandlers,
    };
};
