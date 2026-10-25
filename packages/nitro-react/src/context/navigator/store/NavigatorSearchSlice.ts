import { ISavedSearch, ISearchResultSet, ITopLevelContext } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** A search as `SearchContextHistoryManager` keeps it - Flash's `SearchContext`. */
export interface NavigatorSearchContext {
    searchCode: string;
    filteringData: string;
}

/** `NavigatorCache.EXPIRATION_TIME`: a search's results answer the same search again for this long. */
const SEARCH_CACHE_EXPIRATION_MS = 4000;

/** `NavigatorCache`'s key: `<searchCode>/<filteringData>`. */
const searchCacheKey = (searchCode: string, filteringData: string) => `${searchCode}/${filteringData}`;

/** A `NavigatorCacheEntry`: the results and when they stop answering. */
interface NavigatorSearchCacheEntry {
    result: ISearchResultSet;
    expiresAt: number;
}

/** filter_type_drop_menu options from navigator_frame_2 */
export type NavigatorFilterType = 'anything' | 'room.name' | 'owner' | 'tag' | 'group';

/**
 * The drop menu's modes in its own order, each with the prefix a search's `filteringData` carries
 * for it - `SearchView`'s selector entries over `FilterMode.FILTER_PREFIX`.
 */
export const NAVIGATOR_FILTER_TYPES: { type: NavigatorFilterType; prefix: string }[] = [
    { type: 'anything', prefix: '' },
    { type: 'room.name', prefix: 'roomname:' },
    { type: 'owner', prefix: 'owner:' },
    { type: 'tag', prefix: 'tag:' },
    { type: 'group', prefix: 'group:' },
];

/**
 * `SearchView.setTextAndSearchModeFromFilter` via `FilterMode.filterInInput`: a filter that starts
 * with a mode's prefix selects that mode and shows the rest in the field (`owner:Test` is the
 * owner mode and `Test`); any other filter is the first mode with the whole text.
 */
export const splitNavigatorFilter = (filteringData: string): { filterType: NavigatorFilterType; searchFilter: string } => {
    const mode = NAVIGATOR_FILTER_TYPES.find(x => (x.prefix !== '') && filteringData.startsWith(x.prefix));

    return mode
        ? { filterType: mode.type, searchFilter: filteringData.slice(mode.prefix.length) }
        : { filterType: 'anything', searchFilter: filteringData };
};

/**
 * The navigator's searches - `HabboNewNavigator`'s tabs, saved searches and results, the search
 * view's field and drop menu, the results' collapsed blocks and view modes, and the back button's
 * history (`SearchContextHistoryManager`) and `NavigatorCache`.
 */
type State = {
    topLevelContexts: ITopLevelContext[];
    topLevelContext: ITopLevelContext | undefined;
    savedSearches: ISavedSearch[];
    searchResult: ISearchResultSet | undefined;
    collapsedCategories: string[];
    expandedCategories: string[];
    viewModes: Record<string, number>;
    searchFilter: string;
    filterType: NavigatorFilterType;
    isSearching: boolean;
    /** `SearchContextHistoryManager`: every search answered, and where the back button stands in them. */
    searchHistory: NavigatorSearchContext[];
    searchHistoryIndex: number;
    /** `_noPushToHistoryDueToNavigation`: the next answer comes from walking the history, so it is not added to it. */
    skipNextSearchHistoryPush: boolean;
    /** `_lastSearchCode` / `_lastSearchFilter`: the last search sent to the server, which the refresh button repeats. */
    lastSearch: NavigatorSearchContext | undefined;
    /** `NavigatorCache`, by `<searchCode>/<filteringData>`. */
    searchCache: Record<string, NavigatorSearchCacheEntry>;
};

type Actions = {
    setTopLevelContexts: (topLevelContexts: ITopLevelContext[]) => void;
    setTopLevelContext: (topLevelContext: ITopLevelContext | undefined) => void;
    setSavedSearches: (savedSearches: ISavedSearch[]) => void;
    setSearchResult: (searchResult: ISearchResultSet | undefined) => void;
    setCollapsedCategories: (collapsedCategories: string[]) => void;
    toggleCollapsedCategory: (code: string) => void;
    toggleExpandedCategory: (code: string) => void;
    setFilterType: (filterType: NavigatorFilterType) => void;
    setViewMode: (code: string, mode: number) => void;
    setSearchFilter: (searchFilter: string) => void;
    setIsSearching: (isSearching: boolean) => void;
    /**
     * `HabboNewNavigator.onSearchResult`: the results are added to the history (unless walking it),
     * cached, and shown.
     */
    receiveSearchResult: (searchResult: ISearchResultSet) => void;
    /** `NavigatorCache.getEntry`: an unexpired entry, dropping it once it has expired. */
    getCachedSearchResult: (searchCode: string, filteringData: string) => ISearchResultSet | undefined;
    removeCachedSearchResult: (searchCode: string, filteringData: string) => void;
    setLastSearch: (lastSearch: NavigatorSearchContext) => void;
    /** `goBack`: steps back and hands back the search to make, or nothing when there is none before it. */
    stepBackSearchHistory: () => NavigatorSearchContext | undefined;
};

export const NavigatorSearchSliceInitialState: State = {
    topLevelContexts: [],
    topLevelContext: undefined,
    savedSearches: [],
    searchResult: undefined,
    collapsedCategories: [],
    expandedCategories: [],
    viewModes: {},
    searchFilter: '',
    filterType: 'anything',
    isSearching: false,
    searchHistory: [],
    searchHistoryIndex: -1,
    skipNextSearchHistoryPush: false,
    lastSearch: undefined,
    searchCache: {},
};

export type NavigatorSearchSlice = State & Actions;

export const createNavigatorSearchSlice: StateCreator<NavigatorSearchSlice, [], [], NavigatorSearchSlice> = (set, get) => ({
    ...NavigatorSearchSliceInitialState,
    setTopLevelContexts: topLevelContexts => set({ topLevelContexts }),
    setTopLevelContext: topLevelContext => set({ topLevelContext }),
    setSavedSearches: savedSearches => set({ savedSearches }),
    /*
     * `NavigatorView.onSearchResults`: the tab of the search the results answer is selected, when
     * there is one, and the filter they carry is put back in the drop menu and the field - so a
     * search made from elsewhere (`owner:<name>` from a profile) reads as one made here.
     */
    setSearchResult: searchResult => set((x) => {
        const cleared = {
            searchResult,
            isSearching: false,
            // BlockResultsView reseeds _searchCodeViewMode from the incoming blocks
            viewModes: Object.fromEntries((searchResult?.blocks ?? []).map(block => [ block.searchCode, block.viewMode ])),
        };

        if (!searchResult) return cleared;

        return {
            ...cleared,
            topLevelContext: x.topLevelContexts.find(context => context.searchCode === searchResult.searchCodeOriginal) ?? x.topLevelContext,
            ...splitNavigatorFilter(searchResult.filteringData),
        };
    }),
    setCollapsedCategories: collapsedCategories => set({ collapsedCategories }),
    toggleCollapsedCategory: code => set(x => ({
        collapsedCategories: x.collapsedCategories.includes(code)
            ? x.collapsedCategories.filter(y => y !== code)
            : [ ...x.collapsedCategories, code ],
    })),
    toggleExpandedCategory: code => set(x => ({
        expandedCategories: x.expandedCategories.includes(code)
            ? x.expandedCategories.filter(y => y !== code)
            : [ ...x.expandedCategories, code ],
    })),
    setFilterType: filterType => set({ filterType }),
    setViewMode: (code, mode) => set(x => ({ viewModes: { ...x.viewModes, [code]: mode } })),
    setSearchFilter: searchFilter => set({ searchFilter }),
    setIsSearching: isSearching => set({ isSearching }),
    receiveSearchResult: (searchResult) => {
        const now = Date.now();

        set((x) => {
            // `addSearchContextAtCurrentOffset`: anything ahead of the current entry goes.
            const history = x.skipNextSearchHistoryPush
                ? x.searchHistory
                : [ ...x.searchHistory.slice(0, x.searchHistoryIndex + 1), { searchCode: searchResult.searchCodeOriginal, filteringData: searchResult.filteringData } ];
            // `NavigatorCache.put` drops the expired entries first.
            const searchCache = Object.fromEntries(Object.entries(x.searchCache).filter(([ , entry ]) => entry.expiresAt > now));

            searchCache[searchCacheKey(searchResult.searchCodeOriginal, searchResult.filteringData)] = { result: searchResult, expiresAt: now + SEARCH_CACHE_EXPIRATION_MS };

            return {
                searchHistory: history,
                searchHistoryIndex: x.skipNextSearchHistoryPush ? x.searchHistoryIndex : history.length - 1,
                skipNextSearchHistoryPush: false,
                searchCache,
            };
        });

        get().setSearchResult(searchResult);
    },
    getCachedSearchResult: (searchCode, filteringData) => {
        const entry = get().searchCache[searchCacheKey(searchCode, filteringData)];

        if (!entry) return undefined;

        if (entry.expiresAt <= Date.now()) {
            get().removeCachedSearchResult(searchCode, filteringData);

            return undefined;
        }

        return entry.result;
    },
    removeCachedSearchResult: (searchCode, filteringData) => set((x) => {
        const key = searchCacheKey(searchCode, filteringData);

        return { searchCache: Object.fromEntries(Object.entries(x.searchCache).filter(([ entryKey ]) => entryKey !== key)) };
    }),
    setLastSearch: lastSearch => set({ lastSearch }),
    stepBackSearchHistory: () => {
        const { searchHistory, searchHistoryIndex } = get();

        // `hasPrevious`.
        if ((searchHistoryIndex <= 0) || !searchHistory.length) return undefined;

        set({ searchHistoryIndex: searchHistoryIndex - 1, skipNextSearchHistoryPush: true });

        return searchHistory[searchHistoryIndex - 1];
    },
});
