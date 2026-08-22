import type { IEventCategory, IFlatCategory, IHabboGroupDetailsData, IPerk, IRoomInfo, ISavedSearch, ISearchResultSet, ITopLevelContext } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

/** filter_type_drop_menu options from navigator_frame_2 */
export type NavigatorFilterType = 'anything' | 'room.name' | 'owner' | 'tag' | 'group';

/** SearchContext(searchCodeOriginal, filteringData) */
export type NavigatorSearchContext = { searchCode: string; filter: string };

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
    /*
     * per-block open/closed set by the user since the current result set arrived —
     * mirrors BlockResultsView.replaceBlock(id, open), which renders a clicked block
     * open/closed unconditionally, overriding the block's forceClosed flag
     */
    expandOverrides: Record<string, boolean>;
    viewModes: Record<string, number>;
    /* SearchContextHistoryManager — list plus browsing offset */
    searchHistory: NavigatorSearchContext[];
    searchHistoryOffset: number;
    /* HabboNewNavigator._noPushToHistoryDueToNavigation */
    noPushToHistory: boolean;
    filterType: NavigatorFilterType;
    leftPaneHidden: boolean;
    isSearching: boolean;
    currentRoom: IRoomInfo | undefined;
    currentRoomIsOwner: boolean;
    favoriteRoomIds: number[];
    homeRoomId: number;
    /* HabboNewNavigator.getCachedGroupDetails */
    groupDetails: Record<number, IHabboGroupDetailsData>;
    /* RoomInfoPopup — showRoomInfoBubbleAt(room, x, y) */
    roomInfoPopup: { room: IRoomInfo; x: number; y: number } | undefined;
    /* RoomCreateViewCtrl.show()/close() toggle the roc_create_room window's visibility */
    createRoomOpen: boolean;
    /* AlertView/SimpleAlertView — nav_simple_alert, caption + body text */
    alert: { title: string; message: string } | undefined;
    /*
     * GuestRoomDoorbell — the window survives hide() (ring keeps the room data for the
     * waiting/no-answer states) and only close() disposes it. waiting mirrors §_-xu§:
     * once set, closing the window sends the cancel-entering composer.
     */
    doorbell: { room: IRoomInfo; waiting: boolean; noAnswer: boolean; visible: boolean } | undefined;
    /* GuestRoomPasswordInput — try hides the window; showRetry re-shows it with retryinfo */
    passwordPrompt: { room: IRoomInfo; retry: boolean; visible: boolean } | undefined;
}

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
    setCategoryCollapsed: (code: string, collapsed: boolean) => void;
    setBlockExpanded: (code: string, expanded: boolean) => void;
    pushSearchContext: (context: NavigatorSearchContext) => void;
    popPreviousSearchContext: () => NavigatorSearchContext | null;
    setFilterType: (filterType: NavigatorFilterType) => void;
    setLeftPaneHidden: (leftPaneHidden: boolean) => void;
    setViewMode: (code: string, mode: number) => void;
    setIsSearching: (isSearching: boolean) => void;
    setCurrentRoom: (currentRoom: IRoomInfo | undefined, currentRoomIsOwner: boolean) => void;
    setFavoriteRoomIds: (favoriteRoomIds: number[]) => void;
    setRoomFavorite: (roomId: number, favorite: boolean) => void;
    setHomeRoomId: (homeRoomId: number) => void;
    setGroupDetails: (details: IHabboGroupDetailsData) => void;
    showRoomInfoPopup: (room: IRoomInfo, x: number, y: number) => void;
    hideRoomInfoPopup: () => void;
    showCreateRoom: () => void;
    hideCreateRoom: () => void;
    showAlert: (title: string, message: string) => void;
    hideAlert: () => void;
    showDoorbell: (room: IRoomInfo) => void;
    showDoorbellWaiting: () => void;
    showDoorbellNoAnswer: () => void;
    hideDoorbellWindow: () => void;
    closeDoorbell: () => void;
    showPasswordPrompt: (room: IRoomInfo) => void;
    showPasswordRetry: () => void;
    hidePasswordWindow: () => void;
    closePasswordPrompt: () => void;
    resetNavigator: () => void;
}

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
    expandOverrides: {},
    viewModes: {},
    searchHistory: [],
    searchHistoryOffset: -1,
    noPushToHistory: false,
    filterType: 'anything',
    leftPaneHidden: false,
    isSearching: false,
    currentRoom: undefined,
    currentRoomIsOwner: false,
    favoriteRoomIds: [],
    homeRoomId: -1,
    groupDetails: {},
    roomInfoPopup: undefined,
    createRoomOpen: false,
    alert: undefined,
    doorbell: undefined,
    passwordPrompt: undefined
};

export type NavigatorContextStore = State & Actions;

export const createNavigatorContextStore = () => createStore<NavigatorContextStore>()((set, get) => ({
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
        // renderCurrentResults starts from a clean slate: user overrides are dropped
        expandOverrides: {},
        // BlockResultsView reseeds _searchCodeViewMode from the incoming blocks
        viewModes: Object.fromEntries((searchResult?.blocks ?? []).map(x => [x.searchCode, x.viewMode]))
    }),
    setCollapsedCategories: collapsedCategories => set({ collapsedCategories }),
    setCategoryCollapsed: (code, collapsed) => set(x => ({
        collapsedCategories: collapsed
            ? (x.collapsedCategories.includes(code) ? x.collapsedCategories : [...x.collapsedCategories, code])
            : x.collapsedCategories.filter(y => y !== code)
    })),
    setBlockExpanded: (code, expanded) => set(x => ({ expandOverrides: { ...x.expandOverrides, [code]: expanded } })),
    /*
     * HabboNewNavigator.onSearchResults pushes SearchContext(searchCodeOriginal,
     * filteringData) unless _noPushToHistoryDueToNavigation, then clears the flag.
     * addSearchContextAtCurrentOffset truncates any forward entries first.
     */
    pushSearchContext: context => set(x => {
        if (x.noPushToHistory) return { noPushToHistory: false };

        const searchHistory = [...x.searchHistory.slice(0, x.searchHistoryOffset + 1), context];

        return { searchHistory, searchHistoryOffset: searchHistory.length - 1 };
    }),
    /* goBack — hasPrevious is offset > 0; returns history[--offset] without pushing */
    popPreviousSearchContext: () => {
        const { searchHistory, searchHistoryOffset } = get();

        if (searchHistoryOffset <= 0 || !searchHistory.length) return null;

        set({ searchHistoryOffset: searchHistoryOffset - 1, noPushToHistory: true });

        return searchHistory[searchHistoryOffset - 1];
    },
    setFilterType: filterType => set({ filterType }),
    setLeftPaneHidden: leftPaneHidden => set({ leftPaneHidden }),
    setViewMode: (code, mode) => set(x => ({ viewModes: { ...x.viewModes, [code]: mode } })),
    setIsSearching: isSearching => set({ isSearching }),
    setCurrentRoom: (currentRoom, currentRoomIsOwner) => set({ currentRoom, currentRoomIsOwner }),
    setFavoriteRoomIds: favoriteRoomIds => set({ favoriteRoomIds }),
    setRoomFavorite: (roomId, favorite) => set(x => ({
        favoriteRoomIds: favorite
            ? (x.favoriteRoomIds.includes(roomId) ? x.favoriteRoomIds : [...x.favoriteRoomIds, roomId])
            : x.favoriteRoomIds.filter(y => y !== roomId)
    })),
    setHomeRoomId: homeRoomId => set({ homeRoomId }),
    setGroupDetails: details => set(x => ({ groupDetails: { ...x.groupDetails, [details.groupId]: details } })),
    showRoomInfoPopup: (room, x, y) => set({ roomInfoPopup: { room, x, y } }),
    hideRoomInfoPopup: () => set({ roomInfoPopup: undefined }),
    showCreateRoom: () => set({ createRoomOpen: true }),
    hideCreateRoom: () => set({ createRoomOpen: false }),
    showAlert: (title, message) => set({ alert: { title, message } }),
    hideAlert: () => set({ alert: undefined }),
    showDoorbell: room => set({ doorbell: { room, waiting: false, noAnswer: false, visible: true } }),
    /* showWaiting() re-shows the kept window: show(room, null, true) */
    showDoorbellWaiting: () => set(x => (x.doorbell ? { doorbell: { ...x.doorbell, waiting: true, noAnswer: false, visible: true } } : {})),
    showDoorbellNoAnswer: () => set(x => (x.doorbell ? { doorbell: { ...x.doorbell, noAnswer: true, visible: true } } : {})),
    hideDoorbellWindow: () => set(x => (x.doorbell ? { doorbell: { ...x.doorbell, visible: false } } : {})),
    closeDoorbell: () => set({ doorbell: undefined }),
    showPasswordPrompt: room => set({ passwordPrompt: { room, retry: false, visible: true } }),
    showPasswordRetry: () => set(x => (x.passwordPrompt ? { passwordPrompt: { ...x.passwordPrompt, retry: true, visible: true } } : {})),
    hidePasswordWindow: () => set(x => (x.passwordPrompt ? { passwordPrompt: { ...x.passwordPrompt, visible: false } } : {})),
    closePasswordPrompt: () => set({ passwordPrompt: undefined }),
    resetNavigator: () => set({ ...initialState })
}));
