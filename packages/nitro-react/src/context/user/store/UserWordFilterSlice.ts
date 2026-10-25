/**
 * The account's own word filter - the list `WordFilterSettingsView` shows and edits
 * (`GetCustomFilterMessageComposer` on open, `AddToCustomFilter` / `RemoveFromCustomFilter`, and
 * `ModifyCustomFilterResultMessageEvent` answering each). The server owns the list; every change
 * here is applied from its answer, never optimistically, which is how Flash keeps a refused word
 * out of the list.
 */
import { StateCreator } from 'zustand';

/** `onModifyCustomFilter`: the word is now filtered. */
export const CUSTOM_FILTER_RESULT_ADDED = 1;
/** The word is no longer filtered. */
export const CUSTOM_FILTER_RESULT_REMOVED = 3;

type State = {
    /** In the order the server lists them; Flash appends an added word to the end. */
    filteredWords: string[];
    /**
     * Which row the list has selected, as Flash's `§_-TR§` does - the remove button acts on it,
     * and it is dropped on every add and remove so a stale index never removes the wrong word.
     */
    selectedWordIndex: number;
};

type Actions = {
    /** `onCustomWords`: the list as it stands, words already held kept in place. */
    setFilteredWords: (words: string[]) => void;
    /** `onModifyCustomFilter`: one word added or removed by result code; anything else is ignored. */
    applyCustomFilterResult: (result: number, word: string) => void;
    setSelectedWordIndex: (selectedWordIndex: number) => void;
};

export const UserWordFilterSliceInitialState: State = {
    filteredWords: [],
    selectedWordIndex: -1,
};

export type UserWordFilterSlice = State & Actions;

export const createUserWordFilterSlice: StateCreator<UserWordFilterSlice, [], [], State & Actions> = set => ({
    ...UserWordFilterSliceInitialState,
    setFilteredWords: words => set((x) => {
        const merged = [ ...x.filteredWords ];

        // Flash pushes only what it does not already hold, so a second answer does not duplicate.
        for (const word of words) if (!merged.includes(word)) merged.push(word);

        return { filteredWords: merged, selectedWordIndex: -1 };
    }),
    applyCustomFilterResult: (result, word) => set((x) => {
        if (result === CUSTOM_FILTER_RESULT_ADDED) {
            if (x.filteredWords.includes(word)) return x;

            return { filteredWords: [ ...x.filteredWords, word ], selectedWordIndex: -1 };
        }

        if (result === CUSTOM_FILTER_RESULT_REMOVED) {
            if (!x.filteredWords.includes(word)) return x;

            return { filteredWords: x.filteredWords.filter(held => held !== word), selectedWordIndex: -1 };
        }

        return x;
    }),
    setSelectedWordIndex: selectedWordIndex => set({ selectedWordIndex }),
});
