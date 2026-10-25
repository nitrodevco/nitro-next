import { StateCreator } from 'zustand';

/** The room settings dialogs the navigator owns: the category enforcement (`EnforceCategoryCtrl`) and the word filter (`RoomFilterCtrl`). */
type State = {
    /** `EnforceCategoryCtrl.show(selectionType)`: the dialog is up. */
    enforceCategorySelectionType: number | undefined;
    /** `RoomFilterCtrl._flatId`: the room whose word filter is being edited, 0 for none. */
    roomFilterFlatId: number;
    /** `RoomFilterCtrl`'s words, as the server has sent them and the window has removed them. */
    roomFilterWords: string[];
    /** `RoomFilterCtrl._selectedRow`. */
    roomFilterSelectedIndex: number;
};

type Actions = {
    setEnforceCategorySelectionType: (selectionType: number | undefined) => void;
    setRoomFilterFlatId: (flatId: number) => void;
    /** `onRoomFilterSettings`: only the words not already held are added - none are dropped. */
    mergeRoomFilterWords: (words: string[]) => void;
    /** `onRemoveWordClick`'s local half: the word leaves the list at once. */
    removeRoomFilterWord: (word: string) => void;
    setRoomFilterSelectedIndex: (index: number) => void;
    /** `disposeWindow`: the window's words and selection go with it. */
    clearRoomFilter: () => void;
};

export const NavigatorRoomSettingsSliceInitialState: State = {
    enforceCategorySelectionType: undefined,
    roomFilterFlatId: 0,
    roomFilterWords: [],
    roomFilterSelectedIndex: -1,
};

export type NavigatorRoomSettingsSlice = State & Actions;

export const createNavigatorRoomSettingsSlice: StateCreator<NavigatorRoomSettingsSlice, [], [], NavigatorRoomSettingsSlice> = set => ({
    ...NavigatorRoomSettingsSliceInitialState,
    setEnforceCategorySelectionType: enforceCategorySelectionType => set({ enforceCategorySelectionType }),
    setRoomFilterFlatId: roomFilterFlatId => set({ roomFilterFlatId }),
    mergeRoomFilterWords: words => set(x => ({ roomFilterWords: [ ...x.roomFilterWords, ...words.filter((word, index) => !x.roomFilterWords.includes(word) && (words.indexOf(word) === index)) ] })),
    removeRoomFilterWord: word => set(x => ({ roomFilterWords: x.roomFilterWords.filter(held => held !== word), roomFilterSelectedIndex: -1 })),
    setRoomFilterSelectedIndex: roomFilterSelectedIndex => set({ roomFilterSelectedIndex }),
    clearRoomFilter: () => set({ roomFilterWords: [], roomFilterSelectedIndex: -1 }),
});
