import { createStore } from 'zustand';

/** The friend list window's rectangle on the desktop (`FriendListView.mainWindow`). */
export type FriendListWindowRect = { x: number; y: number; width: number; height: number };

type State = {
    tooltip: string;
    showListSearchInput: boolean;
    listSearchValue: string;
    filterValue: string;
    selectedFriendIds: number[];
    relationshipDropdownId: number;
    windowRect: FriendListWindowRect | null;
};

type Actions = {
    setTooltip: (tooltip: string) => void;
    setListSearchValue: (listSearchValue: string) => void;
    setFilterValue: (filterValue: string) => void;
    setSelectedFriendIds: (selectedFriendIds: number[]) => void;
    setRelationshipDropdownId: (relationshipDropdownId: number) => void;
    setWindowRect: (windowRect: FriendListWindowRect) => void;
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
    windowRect: null,
};

/**
 * The friend list window's own state - its search and filter inputs and what is selected.
 * Window-scoped: created with the window and dropped when it closes.
 */
export type FriendsStore = State & Actions;

export const createFriendsStore = () => createStore<FriendsStore>()(set => ({
    ...initialState,
    setTooltip: (tooltip: string) => set({ tooltip }),
    setListSearchValue: (listSearchValue: string) => set({ listSearchValue }),
    setFilterValue: (filterValue: string) => set({ filterValue }),
    setSelectedFriendIds: (selectedFriendIds: number[]) => set({ selectedFriendIds }),
    setRelationshipDropdownId: (relationshipDropdownId: number) => set({ relationshipDropdownId }),
    setWindowRect: (windowRect: FriendListWindowRect) => set((x) => {
        const old = x.windowRect;

        return (old && old.x === windowRect.x && old.y === windowRect.y && old.width === windowRect.width && old.height === windowRect.height) ? x : { windowRect };
    }),
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
