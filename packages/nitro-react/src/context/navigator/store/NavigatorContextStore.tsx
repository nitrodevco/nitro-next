import { IEventCategory, IFlatCategory, IPerk, IRoomInfo, ISavedSearch, ISearchResultList, ISearchResultSet, ITopLevelContext } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

/**
 * The room-entry popup the navigator shows while a locked/password room is being entered
 * (the Flash `GuestRoomDoorbell` / `GuestRoomPasswordInput` windows):
 * - `doorbell`: ask to ring; `doorbell_rung`: rung, window hidden until the server answers; `doorbell_waiting`:
 *   the server acknowledged the ring; `doorbell_no_answer`: nobody let us in.
 * - `password`: ask for the password; `password_sent`: window hidden while the server checks it; `password_retry`: rejected.
 * The `_rung`/`_sent` modes are the Flash windows' hidden-but-not-disposed state: a later
 * server reply re-shows the same window instead of creating a new one.
 */
export type NavigatorRoomEntryDialogMode = 'doorbell' | 'doorbell_rung' | 'doorbell_waiting' | 'doorbell_no_answer' | 'password' | 'password_sent' | 'password_retry';

export interface NavigatorRoomEntryDialog {
    room: IRoomInfo;
    mode: NavigatorRoomEntryDialogMode;
}

/** A modal message (the Flash `SimpleAlertView`): localization keys for the title and body. */
export interface NavigatorAlert {
    titleKey: string;
    messageKey: string;
}

/** filter_type_drop_menu options from navigator_frame_2 */
export type NavigatorFilterType = 'anything' | 'room.name' | 'owner' | 'tag' | 'group';

type State = {
    topLevelContexts: ITopLevelContext[];
    topLevelContext: ITopLevelContext | undefined;
    savedSearches: ISavedSearch[];
    perks: IPerk[];
    /* NewNavigatorPreferencesMessage — HabboNewNavigator.onPreferences */
    preferences: { windowX: number; windowY: number; windowWidth: number; windowHeight: number; resultsMode: number } | undefined;
    flatCategories: IFlatCategory[];
    eventCategories: IEventCategory[];
    searchResult: ISearchResultSet | undefined;
    collapsedCategories: string[];
    expandedCategories: string[];
    viewModes: Record<string, number>;
    searchFilter: string;
    filterType: NavigatorFilterType;
    leftPaneHidden: boolean;
    isSearching: boolean;
    currentRoom: IRoomInfo | undefined;
    currentRoomIsOwner: boolean;
    roomEntryDialog: NavigatorRoomEntryDialog | undefined;
    alert: NavigatorAlert | undefined;
};

type Actions = {
    setTopLevelContexts: (topLevelContexts: ITopLevelContext[]) => void;
    setTopLevelContext: (topLevelContext: ITopLevelContext | undefined) => void;
    setSavedSearches: (savedSearches: ISavedSearch[]) => void;
    setPerks: (perks: IPerk[]) => void;
    setPreferences: (preferences: { windowX: number; windowY: number; windowWidth: number; windowHeight: number; resultsMode: number }) => void;
    setFlatCategories: (flatCategories: IFlatCategory[]) => void;
    setEventCategories: (eventCategories: IEventCategory[]) => void;
    setSearchResult: (searchResult: ISearchResultSet | undefined) => void;
    setCollapsedCategories: (collapsedCategories: string[]) => void;
    toggleCollapsedCategory: (code: string) => void;
    toggleExpandedCategory: (code: string) => void;
    setFilterType: (filterType: NavigatorFilterType) => void;
    setLeftPaneHidden: (leftPaneHidden: boolean) => void;
    setViewMode: (code: string, mode: number) => void;
    setSearchFilter: (searchFilter: string) => void;
    setIsSearching: (isSearching: boolean) => void;
    setCurrentRoom: (currentRoom: IRoomInfo | undefined, currentRoomIsOwner: boolean) => void;
    setRoomEntryDialog: (dialog: NavigatorRoomEntryDialog | undefined) => void;
    /** Changes the mode of the open room-entry dialog; a no-op when none is open (the Flash windows ignore state changes once disposed). */
    setRoomEntryDialogMode: (mode: NavigatorRoomEntryDialogMode) => void;
    setAlert: (alert: NavigatorAlert | undefined) => void;
    resetNavigator: () => void;
};

const initialState: State = {
    topLevelContexts: [],
    topLevelContext: undefined,
    savedSearches: [],
    perks: [],
    preferences: undefined,
    flatCategories: [],
    eventCategories: [],
    searchResult: undefined,
    collapsedCategories: [],
    expandedCategories: [],
    viewModes: {},
    searchFilter: '',
    filterType: 'anything',
    leftPaneHidden: false,
    isSearching: false,
    currentRoom: undefined,
    currentRoomIsOwner: false,
    roomEntryDialog: undefined,
    alert: undefined,
};

export type NavigatorContextStore = State & Actions;

export const createNavigatorContextStore = () => createStore<NavigatorContextStore>()(set => ({
    ...initialState,
    setTopLevelContexts: topLevelContexts => set({ topLevelContexts }),
    setTopLevelContext: topLevelContext => set({ topLevelContext }),
    setSavedSearches: savedSearches => set({ savedSearches }),
    setPerks: perks => set({ perks }),
    setPreferences: preferences => set({ preferences }),
    setFlatCategories: flatCategories => set({ flatCategories }),
    setEventCategories: eventCategories => set({ eventCategories }),
    setSearchResult: searchResult => set({
        searchResult,
        isSearching: false,
        // BlockResultsView reseeds _searchCodeViewMode from the incoming blocks
        viewModes: Object.fromEntries((searchResult?.blocks ?? []).map(x => [ x.searchCode, x.viewMode ])),
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
    setLeftPaneHidden: leftPaneHidden => set({ leftPaneHidden }),
    setViewMode: (code, mode) => set(x => ({ viewModes: { ...x.viewModes, [code]: mode } })),
    setSearchFilter: searchFilter => set({ searchFilter }),
    setIsSearching: isSearching => set({ isSearching }),
    setCurrentRoom: (currentRoom, currentRoomIsOwner) => set({ currentRoom, currentRoomIsOwner }),
    setRoomEntryDialog: roomEntryDialog => set({ roomEntryDialog }),
    setRoomEntryDialogMode: mode => set(x => (x.roomEntryDialog ? { roomEntryDialog: { ...x.roomEntryDialog, mode } } : {})),
    setAlert: alert => set({ alert }),
    resetNavigator: () => set({ ...initialState }),
}));

export type { ISearchResultList };
