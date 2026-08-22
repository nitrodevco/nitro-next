import type { IBannedUserData, IEventCategory, IFlatCategory, IFlatControllerData, IHabboGroupDetailsData, IPerk, IRoomEventData, IRoomInfo, IRoomSettingsData, ISavedSearch, ISearchResultSet, ITopLevelContext } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

/** filter_type_drop_menu options from navigator_frame_2 */
export type NavigatorFilterType = 'anything' | 'room.name' | 'owner' | 'tag' | 'group';

/** SearchContext(searchCodeOriginal, filteringData) */
export type NavigatorSearchContext = { searchCode: string; filter: string };

/**
 * SearchView.FILTER_SELECTOR_INDEX_TO_MODE = [5,2,1,3,4] indexing
 * FILTER_PREFIX = ["", "owner:", "roomname:", "tag:", "group:", ""]
 */
export const NAVIGATOR_FILTER_TYPES: { type: NavigatorFilterType; prefix: string }[] = [
    { type: 'anything', prefix: '' },
    { type: 'room.name', prefix: 'roomname:' },
    { type: 'owner', prefix: 'owner:' },
    { type: 'tag', prefix: 'tag:' },
    { type: 'group', prefix: 'group:' }
];

/** NavigatorCache.EXPIRATION_TIME */
const SEARCH_CACHE_TTL_MS = 4000;

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
    /*
     * SearchView input state — searchText mirrors the field caption; searchTextCarry
     * mirrors the placeholder formatting flag setTextAndSearchModeFromFilter sets when
     * it re-displays text carried across a tab switch (grey + italic until focused)
     */
    searchText: string;
    searchTextCarry: boolean;
    /* §_-F1r§ — the searchInputText passed to performSearch, applied when results arrive */
    pendingSearchText: string;
    /* _lastSearchCode / §_-g1G§ — filter stays null until the first real send */
    lastSearch: { searchCode: string; filter: string | null };
    /* NavigatorCache — SearchResultContainer by "searchCode/filter", 4000ms TTL */
    searchCache: Record<string, { result: ISearchResultSet; expiresAt: number }>;
    leftPaneHidden: boolean;
    isSearching: boolean;
    currentRoom: IRoomInfo | undefined;
    currentRoomIsOwner: boolean;
    /* GetGuestRoomResult enterRoom extras — NavigatorData.currentRoomIsStaffPick / canMute / allInRoomMuted */
    currentRoomStaffPick: boolean;
    currentRoomCanMute: boolean;
    currentRoomAllMuted: boolean;
    /* RoomRatingEvent — NavigatorData.currentRoomRating / canRate */
    currentRoomRating: number;
    currentRoomCanRate: boolean;
    /* FavouritesEvent limit — isFavouritesFull() */
    favouritesLimit: number;
    /* UserRightsMessage securityLevel — hasSecurity(5) edits any room, >= 7 is roomPicker */
    securityLevel: number;
    /* YouAreController/YouAreOwner mirror — hasRoomRightsButIsNotOwner and the floor-plan gate */
    roomControllerLevel: number;
    roomIsOwn: boolean;
    /* RoomInfoViewCtrl toggle() */
    roomInfoWindowOpen: boolean;
    /* RoomFilterCtrl — the editor window plus the merged bad-word list */
    roomFilterOpen: boolean;
    roomFilterWords: string[];
    /* NavigatorData.roomEventData — null while no event runs (ownerAvatarId <= 0) */
    roomEventData: IRoomEventData | undefined;
    /* RoomEventInfoCtrl._expanded — group rooms contract it on entry */
    roomEventInfoExpanded: boolean;
    /* RoomEventViewCtrl.show() toggle */
    roomEventEditorOpen: boolean;
    /* RoomAdErrorEvent — consumed by the editor for the field errors */
    roomAdError: { errorCode: number; filteredText: string } | undefined;
    favoriteRoomIds: number[];
    homeRoomId: number;
    /* HabboNewNavigator.getCachedGroupDetails */
    groupDetails: Record<number, IHabboGroupDetailsData>;
    /* RoomInfoPopup — showRoomInfoBubbleAt(room, x, y) */
    roomInfoPopup: { room: IRoomInfo; x: number; y: number } | undefined;
    /* RoomCreateViewCtrl.show()/close() toggle the roc_create_room window's visibility */
    createRoomOpen: boolean;
    /* AlertView/SimpleAlertView — nav_simple_alert; a promo text swaps in nav_promo_alert */
    alert: { title: string; message: string; promo?: string } | undefined;
    /* EnforceCategoryCtrl.show(selectionType) — a modal without a close button */
    enforceCategory: { selectionType: number } | undefined;
    /* GroupRoomInfoCtrl._expanded — details arriving expand it, the title toggles */
    groupRoomInfoExpanded: boolean;
    /*
     * GuestRoomDoorbell — the window survives hide() (ring keeps the room data for the
     * waiting/no-answer states) and only close() disposes it. waiting mirrors §_-xu§:
     * once set, closing the window sends the cancel-entering composer.
     */
    doorbell: { room: IRoomInfo; waiting: boolean; noAnswer: boolean; visible: boolean } | undefined;
    /* GuestRoomPasswordInput — try hides the window; showRetry re-shows it with retryinfo */
    passwordPrompt: { room: IRoomInfo; retry: boolean; visible: boolean } | undefined;
    /* §_-Yr§ — the ask_forward room id awaiting its GetGuestRoomResult, -1 when idle */
    pendingForwardRoomId: number;
    /* windowManager.confirm(${navigator.forward_confirmation.title}, desc(room_name)) */
    forwardConfirm: { roomId: number; roomName: string } | undefined;
    /* RoomSettingsCtrl._flatId/_groupId — set by startRoomSettingsEdit until the data packet lands */
    requestedRoomSettings: { roomId: number; groupId: number } | undefined;
    /*
     * RoomSettingsCtrl state — fromNavigator mirrors _removeTabsForNavigatorView
     * (tabs 2/3 and the delete link exist only while inside the edited room);
     * controllers/bannedUsers stay null until their tab first requests them
     */
    roomSettings: {
        data: IRoomSettingsData;
        groupId: number;
        fromNavigator: boolean;
        currentTab: number;
        controllers: IFlatControllerData[] | null;
        bannedUsers: IBannedUserData[] | null;
    } | undefined;
    /* RoomSettingsSaveErrorEvent — consumed by the dialog to place the field error */
    roomSettingsSaveError: { errorCode: number; info: string } | undefined;
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
    applySearchResult: (result: ISearchResultSet) => void;
    getCachedSearch: (key: string) => ISearchResultSet | null;
    evictCachedSearch: (key: string) => void;
    getLastSearch: () => { searchCode: string; filter: string | null };
    setLastSearch: (searchCode: string, filter: string) => void;
    setPendingSearchText: (pendingSearchText: string) => void;
    setSearchText: (searchText: string) => void;
    clearSearchTextCarry: () => void;
    setFilterType: (filterType: NavigatorFilterType) => void;
    setLeftPaneHidden: (leftPaneHidden: boolean) => void;
    setViewMode: (code: string, mode: number) => void;
    setIsSearching: (isSearching: boolean) => void;
    setCurrentRoom: (currentRoom: IRoomInfo | undefined, currentRoomIsOwner: boolean) => void;
    setCurrentRoomExtras: (staffPick: boolean, canMute: boolean, allMuted: boolean) => void;
    setCurrentRoomAllMuted: (allMuted: boolean) => void;
    setCurrentRoomRating: (rating: number, canRate: boolean) => void;
    setCurrentRoomStaffPick: (staffPick: boolean) => void;
    setFavouritesLimit: (favouritesLimit: number) => void;
    setSecurityLevel: (securityLevel: number) => void;
    setRoomControllerLevel: (roomControllerLevel: number) => void;
    setRoomIsOwn: (roomIsOwn: boolean) => void;
    toggleRoomInfoWindow: () => void;
    closeRoomInfoWindow: () => void;
    openRoomFilter: () => void;
    closeRoomFilter: () => void;
    setRoomEventData: (roomEventData: IRoomEventData | undefined) => void;
    setRoomEventInfoExpanded: (roomEventInfoExpanded: boolean) => void;
    toggleRoomEventEditor: () => void;
    closeRoomEventEditor: () => void;
    setRoomAdError: (roomAdError: { errorCode: number; filteredText: string } | undefined) => void;
    mergeRoomFilterWords: (words: string[]) => void;
    removeRoomFilterWord: (word: string) => void;
    setFavoriteRoomIds: (favoriteRoomIds: number[]) => void;
    setRoomFavorite: (roomId: number, favorite: boolean) => void;
    setHomeRoomId: (homeRoomId: number) => void;
    setGroupDetails: (details: IHabboGroupDetailsData) => void;
    showRoomInfoPopup: (room: IRoomInfo, x: number, y: number) => void;
    hideRoomInfoPopup: () => void;
    showCreateRoom: () => void;
    hideCreateRoom: () => void;
    showAlert: (title: string, message: string, promo?: string) => void;
    showEnforceCategory: (selectionType: number) => void;
    closeEnforceCategory: () => void;
    setGroupRoomInfoExpanded: (groupRoomInfoExpanded: boolean) => void;
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
    setPendingForwardRoomId: (roomId: number) => void;
    showForwardConfirm: (roomId: number, roomName: string) => void;
    hideForwardConfirm: () => void;
    requestRoomSettings: (roomId: number, groupId: number) => void;
    applyRoomSettings: (data: IRoomSettingsData) => void;
    closeRoomSettings: () => void;
    setRoomSettingsTab: (tab: number) => void;
    setFlatControllers: (roomId: number, controllers: IFlatControllerData[]) => void;
    addFlatController: (roomId: number, controller: IFlatControllerData) => void;
    removeFlatController: (roomId: number, userId: number) => void;
    setBannedUsers: (roomId: number, bannedUsers: IBannedUserData[]) => void;
    removeBannedUser: (roomId: number, userId: number) => void;
    setRoomSettingsSaveError: (roomId: number, errorCode: number, info: string) => void;
    clearRoomSettingsSaveError: () => void;
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
    searchText: '',
    searchTextCarry: false,
    pendingSearchText: '',
    lastSearch: { searchCode: 'official_view', filter: null },
    searchCache: {},
    leftPaneHidden: false,
    isSearching: false,
    currentRoom: undefined,
    currentRoomIsOwner: false,
    currentRoomStaffPick: false,
    currentRoomCanMute: false,
    currentRoomAllMuted: false,
    currentRoomRating: 0,
    currentRoomCanRate: false,
    favouritesLimit: 30,
    securityLevel: 0,
    roomControllerLevel: 0,
    roomIsOwn: false,
    roomInfoWindowOpen: false,
    roomFilterOpen: false,
    roomFilterWords: [],
    roomEventData: undefined,
    roomEventInfoExpanded: false,
    roomEventEditorOpen: false,
    roomAdError: undefined,
    favoriteRoomIds: [],
    homeRoomId: -1,
    groupDetails: {},
    roomInfoPopup: undefined,
    createRoomOpen: false,
    alert: undefined,
    enforceCategory: undefined,
    groupRoomInfoExpanded: true,
    doorbell: undefined,
    passwordPrompt: undefined,
    pendingForwardRoomId: -1,
    forwardConfirm: undefined,
    requestedRoomSettings: undefined,
    roomSettings: undefined,
    roomSettingsSaveError: undefined
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
    /*
     * HabboNewNavigator.onSearchResult + NavigatorView.onSearchResults — cache the
     * container, record the history entry, auto-select the matching top tab and let
     * SearchView.setTextAndSearchModeFromFilter re-derive the filter dropdown and
     * input text (the carried searchInputText wins and renders placeholder-styled).
     */
    applySearchResult: result => set(x => {
        const now = Date.now();
        const searchCache = Object.fromEntries(Object.entries(x.searchCache).filter(([, entry]) => entry.expiresAt > now));

        searchCache[`${result.searchCodeOriginal}/${result.filteringData}`] = { result, expiresAt: now + SEARCH_CACHE_TTL_MS };

        let { searchHistory, searchHistoryOffset } = x;

        if (!x.noPushToHistory) {
            searchHistory = [...searchHistory.slice(0, searchHistoryOffset + 1), { searchCode: result.searchCodeOriginal, filter: result.filteringData }];
            searchHistoryOffset = searchHistory.length - 1;
        }

        const match = NAVIGATOR_FILTER_TYPES.find(f => f.prefix !== '' && result.filteringData.startsWith(f.prefix));
        const filterType = match ? match.type : 'anything';
        let searchText = match ? result.filteringData.slice(match.prefix.length) : result.filteringData;
        let searchTextCarry = false;

        if (x.pendingSearchText !== '') {
            searchText = x.pendingSearchText;
            searchTextCarry = true;
        }

        return {
            searchResult: result,
            isSearching: false,
            expandOverrides: {},
            viewModes: Object.fromEntries(result.blocks.map(y => [y.searchCode, y.viewMode])),
            searchCache,
            searchHistory,
            searchHistoryOffset,
            noPushToHistory: false,
            filterType,
            searchText,
            searchTextCarry,
            pendingSearchText: '',
            topLevelContext: x.topLevelContexts.find(y => y.searchCode === result.searchCodeOriginal) ?? x.topLevelContext
        };
    }),
    getCachedSearch: key => {
        const entry = get().searchCache[key];

        if (!entry) return null;

        if (entry.expiresAt <= Date.now()) {
            set(x => ({ searchCache: Object.fromEntries(Object.entries(x.searchCache).filter(([k]) => k !== key)) }));

            return null;
        }

        return entry.result;
    },
    evictCachedSearch: key => set(x => ({ searchCache: Object.fromEntries(Object.entries(x.searchCache).filter(([k]) => k !== key)) })),
    getLastSearch: () => get().lastSearch,
    setLastSearch: (searchCode, filter) => set({ lastSearch: { searchCode, filter } }),
    setPendingSearchText: pendingSearchText => set({ pendingSearchText }),
    setSearchText: searchText => set({ searchText, searchTextCarry: false }),
    /* onInputFocused — the formatting turns black but the carried text stays */
    clearSearchTextCarry: () => set({ searchTextCarry: false }),
    setFilterType: filterType => set({ filterType }),
    setLeftPaneHidden: leftPaneHidden => set({ leftPaneHidden }),
    setViewMode: (code, mode) => set(x => ({ viewModes: { ...x.viewModes, [code]: mode } })),
    setIsSearching: isSearching => set({ isSearching }),
    setCurrentRoom: (currentRoom, currentRoomIsOwner) => set({ currentRoom, currentRoomIsOwner }),
    setCurrentRoomExtras: (currentRoomStaffPick, currentRoomCanMute, currentRoomAllMuted) => set({ currentRoomStaffPick, currentRoomCanMute, currentRoomAllMuted }),
    setCurrentRoomAllMuted: currentRoomAllMuted => set({ currentRoomAllMuted }),
    setCurrentRoomRating: (currentRoomRating, currentRoomCanRate) => set({ currentRoomRating, currentRoomCanRate }),
    setCurrentRoomStaffPick: currentRoomStaffPick => set({ currentRoomStaffPick }),
    setFavouritesLimit: favouritesLimit => set({ favouritesLimit }),
    setSecurityLevel: securityLevel => set({ securityLevel }),
    setRoomControllerLevel: roomControllerLevel => set({ roomControllerLevel }),
    setRoomIsOwn: roomIsOwn => set({ roomIsOwn }),
    toggleRoomInfoWindow: () => set(x => ({ roomInfoWindowOpen: !x.roomInfoWindowOpen })),
    closeRoomInfoWindow: () => set({ roomInfoWindowOpen: false }),
    /* startRoomFilterEdit — the word list persists across opens and merges new words */
    openRoomFilter: () => set({ roomFilterOpen: true }),
    closeRoomFilter: () => set({ roomFilterOpen: false }),
    setRoomEventData: roomEventData => set({ roomEventData }),
    setRoomEventInfoExpanded: roomEventInfoExpanded => set({ roomEventInfoExpanded }),
    toggleRoomEventEditor: () => set(x => ({ roomEventEditorOpen: !x.roomEventEditorOpen, roomAdError: undefined })),
    closeRoomEventEditor: () => set({ roomEventEditorOpen: false, roomAdError: undefined }),
    setRoomAdError: roomAdError => set({ roomAdError }),
    mergeRoomFilterWords: words => set(x => ({ roomFilterWords: [...x.roomFilterWords, ...words.filter(y => !x.roomFilterWords.includes(y))] })),
    removeRoomFilterWord: word => set(x => ({ roomFilterWords: x.roomFilterWords.filter(y => y !== word) })),
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
    showAlert: (title, message, promo) => set({ alert: { title, message, promo } }),
    showEnforceCategory: selectionType => set({ enforceCategory: { selectionType } }),
    closeEnforceCategory: () => set({ enforceCategory: undefined }),
    setGroupRoomInfoExpanded: groupRoomInfoExpanded => set({ groupRoomInfoExpanded }),
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
    setPendingForwardRoomId: pendingForwardRoomId => set({ pendingForwardRoomId }),
    showForwardConfirm: (roomId, roomName) => set({ forwardConfirm: { roomId, roomName } }),
    hideForwardConfirm: () => set({ forwardConfirm: undefined }),
    /* startRoomSettingsEdit closes any open editor before requesting fresh data */
    requestRoomSettings: (roomId, groupId) => set({ requestedRoomSettings: { roomId, groupId }, roomSettings: undefined, roomSettingsSaveError: undefined }),
    /* onRoomSettings — ignore packets for rooms we did not request */
    applyRoomSettings: data => set(x => {
        if (!x.requestedRoomSettings || x.requestedRoomSettings.roomId !== data.roomId) return {};

        return {
            roomSettings: {
                data,
                groupId: x.requestedRoomSettings.groupId,
                fromNavigator: !x.currentRoom || x.currentRoom.roomId !== data.roomId,
                currentTab: 1,
                controllers: null,
                bannedUsers: null
            }
        };
    }),
    closeRoomSettings: () => set({ requestedRoomSettings: undefined, roomSettings: undefined, roomSettingsSaveError: undefined }),
    setRoomSettingsTab: tab => set(x => (x.roomSettings ? { roomSettings: { ...x.roomSettings, currentTab: tab } } : {})),
    setFlatControllers: (roomId, controllers) => set(x => (
        x.roomSettings && x.roomSettings.data.roomId === roomId
            ? { roomSettings: { ...x.roomSettings, controllers } }
            : {}
    )),
    addFlatController: (roomId, controller) => set(x => (
        x.roomSettings && x.roomSettings.data.roomId === roomId
            ? { roomSettings: { ...x.roomSettings, controllers: [...(x.roomSettings.controllers ?? []).filter(y => y.userId !== controller.userId), controller] } }
            : {}
    )),
    removeFlatController: (roomId, userId) => set(x => (
        x.roomSettings && x.roomSettings.data.roomId === roomId
            ? { roomSettings: { ...x.roomSettings, controllers: (x.roomSettings.controllers ?? []).filter(y => y.userId !== userId) } }
            : {}
    )),
    setBannedUsers: (roomId, bannedUsers) => set(x => (
        x.roomSettings && x.roomSettings.data.roomId === roomId
            ? { roomSettings: { ...x.roomSettings, bannedUsers } }
            : {}
    )),
    removeBannedUser: (roomId, userId) => set(x => (
        x.roomSettings && x.roomSettings.data.roomId === roomId
            ? { roomSettings: { ...x.roomSettings, bannedUsers: (x.roomSettings.bannedUsers ?? []).filter(y => y.userId !== userId) } }
            : {}
    )),
    /*
     * onRoomSettingsSaveError also switches to the offending tab (5 -> access,
     * idle codes -> vip tab, everything else -> basic)
     */
    setRoomSettingsSaveError: (roomId, errorCode, info) => set(x => {
        if (!x.roomSettings || x.roomSettings.data.roomId !== roomId) return {};

        const tab = errorCode === 5 ? 2 : (errorCode === 16 && (info === 'idleSleepTimeoutSeconds' || info === 'idleAutokickTimeoutSeconds') ? 4 : 1);

        return {
            roomSettingsSaveError: { errorCode, info },
            roomSettings: { ...x.roomSettings, currentTab: tab }
        };
    }),
    clearRoomSettingsSaveError: () => set({ roomSettingsSaveError: undefined }),
    resetNavigator: () => set({ ...initialState })
}));
