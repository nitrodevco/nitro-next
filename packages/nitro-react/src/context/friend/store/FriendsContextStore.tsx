import { createStore } from 'zustand';

type State = {
    tooltip: string;
    showListSearchInput: boolean;
    listSearchValue: string;
    filterValue: string;
    selectedFriendIds: number[];
    relationshipDropdownId: number;
};

type Actions = {
    setTooltip: (tooltip: string) => void;
    setListSearchValue: (listSearchValue: string) => void;
    setFilterValue: (filterValue: string) => void;
    setSelectedFriendIds: (selectedFriendIds: number[]) => void;
    setRelationshipDropdownId: (relationshipDropdownId: number) => void;
    toggleListSearchInput: (value: boolean) => void;
    toggleSelectedFriendId: (friendId: number) => void;
    tooltipHandlers: (tooltip: string) => { onMouseEnter: () => void; onMouseLeave: () => void };
};

const initialState: State = {
    tooltip: '',
    showListSearchInput: false,
    listSearchValue: '',
    filterValue: '',
    selectedFriendIds: [],
    relationshipDropdownId: 0,
};

export type FriendsContextStore = State & Actions;

export const createFriendsContextStore = () => createStore<FriendsContextStore>()((set, get, store) => ({
    ...initialState,
    setTooltip: (tooltip: string) => set({ tooltip }),
    setListSearchValue: (listSearchValue: string) => set({ listSearchValue }),
    setFilterValue: (filterValue: string) => set({ filterValue }),
    setSelectedFriendIds: (selectedFriendIds: number[]) => set({ selectedFriendIds }),
    setRelationshipDropdownId: (relationshipDropdownId: number) => set({ relationshipDropdownId }),
    toggleListSearchInput: (value: boolean) => set((x) => {
        const results = { ...x, showListSearchInput: value };

        if (!value) {
            results.listSearchValue = '';
            results.filterValue = '';
        }

        return results;
    }),
    toggleSelectedFriendId: (friendId: number) => set((x) => {
        const selectedFriendIds = [ ...x.selectedFriendIds ];
        const index = selectedFriendIds.indexOf(friendId);

        if (index >= 0) selectedFriendIds.splice(index, 1);
        else selectedFriendIds.push(friendId);

        return { selectedFriendIds };
    }),
    tooltipHandlers: (tooltip: string) => {
        return {
            onMouseEnter: () => set({ tooltip }),
            onMouseLeave: () => set({ tooltip: '' }),
        };
    },
}));
