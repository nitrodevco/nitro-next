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

/**
 * Where you are standing in the line into a full room. Flash raised one `RoomSessionQueueEvent`
 * per queue set and the widget kept only the active one, which is all this holds.
 */
export interface NavigatorRoomQueue {
    /** How many are ahead, plus you. */
    position: number;
    /** The spectator line rather than the visitor one. */
    spectator: boolean;
    /** Standing in the club lane, which moves faster. */
    clubQueue: boolean;
    /** There is another line to move to. */
    canChangeQueue: boolean;
}

/**
 * One room the user has been in this session, as Flash's `RoomVisitHistoryEntry`. The name is
 * filled in from whichever `GetGuestRoomResultMessage` names the room, so a room entered before
 * its info arrived is renamed rather than duplicated.
 */
export interface RoomVisitHistoryEntry {
    roomId: number;
    roomName: string;
}

/**
 * The room the user is actually standing in - Flash's `NavigatorData.enteredGuestRoom`. Only a
 * `GetGuestRoomResultMessage` with `enterRoom` set writes it; looking up another room's info
 * does not, which is why it is its own record.
 */
export interface EnteredRoom {
    info: IRoomInfo;
    /** Whether we own it - the favourite buttons are not offered on your own rooms. */
    isOwner: boolean;
    /** From `GetGuestRoomResultMessage`, not from the room settings. */
    isStaffPicked: boolean;
    canMute: boolean;
    allInRoomMuted: boolean;
}

/** `RoomVisitHistory.MAX_HISTORY_LENGTH` - the oldest entries fall off the front past this. */
const MAX_ROOM_VISIT_HISTORY = 20;

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
    enteredRoom: EnteredRoom | undefined;
    /**
     * Where the user has been this session, oldest first, and where in it they are standing.
     * The room tools' back and forward arrows walk this rather than the server's room history:
     * Flash kept the same list in a process-wide `RoomVisitHistory`.
     */
    roomVisitHistory: RoomVisitHistoryEntry[];
    roomVisitIndex: number;
    /** `RoomRatingMessage`: the room's score, and whether this visit may still add to it. */
    currentRoomRating: number;
    canRateCurrentRoom: boolean;
    /** `FavouritesMessage` - which rooms are favourited, and how many may be. */
    favouriteRoomIds: number[];
    favouriteRoomLimit: number;
    roomEntryDialog: NavigatorRoomEntryDialog | undefined;
    alert: NavigatorAlert | undefined;
    roomQueue: NavigatorRoomQueue | undefined;
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
    setEnteredRoom: (enteredRoom: EnteredRoom | undefined) => void;
    /** Merges into the room already entered; a no-op when it is a different room or none. */
    updateEnteredRoom: (roomId: number, changes: Partial<Omit<EnteredRoom, 'info'>>) => void;
    /** A room was entered: it becomes the current entry, and anything ahead of it is reordered behind it. */
    recordRoomVisit: (roomId: number, roomName: string) => void;
    /** A room named itself, wherever it sits in the history. */
    renameRoomVisit: (roomId: number, roomName: string) => void;
    /** Steps the cursor and hands back the room to go to, or nothing when there is none that way. */
    stepRoomVisitHistory: (direction: -1 | 1) => RoomVisitHistoryEntry | undefined;
    setRoomRating: (rating: number, canRate: boolean) => void;
    setFavouriteRooms: (favouriteRoomIds: number[], favouriteRoomLimit: number) => void;
    setRoomFavourite: (roomId: number, favourite: boolean) => void;
    setRoomEntryDialog: (dialog: NavigatorRoomEntryDialog | undefined) => void;
    /** Changes the mode of the open room-entry dialog; a no-op when none is open (the Flash windows ignore state changes once disposed). */
    setRoomEntryDialogMode: (mode: NavigatorRoomEntryDialogMode) => void;
    setAlert: (alert: NavigatorAlert | undefined) => void;
    setRoomQueue: (roomQueue: NavigatorRoomQueue | undefined) => void;
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
    enteredRoom: undefined,
    roomVisitHistory: [],
    roomVisitIndex: -1,
    currentRoomRating: 0,
    canRateCurrentRoom: false,
    favouriteRoomIds: [],
    favouriteRoomLimit: 0,
    roomEntryDialog: undefined,
    alert: undefined,
    roomQueue: undefined,
};

export type NavigatorStore = State & Actions;

export const createNavigatorStore = () => createStore<NavigatorStore>()((set, get) => ({
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
    setEnteredRoom: enteredRoom => set({ enteredRoom }),
    updateEnteredRoom: (roomId, changes) => set(x => ((x.enteredRoom && (x.enteredRoom.info.roomId === roomId))
        ? { enteredRoom: { ...x.enteredRoom, ...changes } }
        : x)),
    recordRoomVisit: (roomId, roomName) => set((x) => {
        const history = x.roomVisitHistory.map(entry => ((entry.roomId === roomId) ? { ...entry, roomName } : entry));
        const index = Math.min(Math.max(x.roomVisitIndex, history.length ? 0 : -1), history.length - 1);

        // Standing on it already - only the name can have changed.
        if (history[index]?.roomId === roomId) return { roomVisitHistory: history, roomVisitIndex: index };

        /*
         * Walking back and then somewhere new does not throw the forward entries away, as a
         * browser would: Flash reversed them behind the cursor, so the room you came from is
         * the next one back. `RoomVisitHistory.reverseSuffix(index, length - 1)`.
         */
        if (index >= 0 && index < history.length - 1) {
            const tail = history.slice(index).reverse();

            history.length = index;
            history.push(...tail);
        }

        // The room reversing put at the end is the one we are entering: stand on it.
        if (history.length && (history[history.length - 1].roomId === roomId)) {
            history[history.length - 1] = { roomId, roomName };

            return { roomVisitHistory: history, roomVisitIndex: history.length - 1 };
        }

        history.push({ roomId, roomName });

        const trimmed = history.slice(Math.max(0, history.length - MAX_ROOM_VISIT_HISTORY));

        return { roomVisitHistory: trimmed, roomVisitIndex: trimmed.length - 1 };
    }),
    renameRoomVisit: (roomId, roomName) => set(x => ({
        roomVisitHistory: x.roomVisitHistory.map(entry => ((entry.roomId === roomId) ? { ...entry, roomName } : entry)),
    })),
    stepRoomVisitHistory: (direction) => {
        const { roomVisitHistory, roomVisitIndex } = get();
        const index = roomVisitIndex + direction;

        if (index < 0 || index >= roomVisitHistory.length) return undefined;

        set({ roomVisitIndex: index });

        return roomVisitHistory[index];
    },
    setRoomRating: (currentRoomRating, canRateCurrentRoom) => set({ currentRoomRating, canRateCurrentRoom }),
    setFavouriteRooms: (favouriteRoomIds, favouriteRoomLimit) => set({ favouriteRoomIds, favouriteRoomLimit }),
    setRoomFavourite: (roomId, favourite) => set(x => ({
        favouriteRoomIds: favourite
            ? (x.favouriteRoomIds.includes(roomId) ? x.favouriteRoomIds : [ ...x.favouriteRoomIds, roomId ])
            : x.favouriteRoomIds.filter(id => id !== roomId),
    })),
    setRoomEntryDialog: roomEntryDialog => set({ roomEntryDialog }),
    setRoomEntryDialogMode: mode => set(x => (x.roomEntryDialog ? { roomEntryDialog: { ...x.roomEntryDialog, mode } } : {})),
    setAlert: alert => set({ alert }),
    setRoomQueue: roomQueue => set({ roomQueue }),
    resetNavigator: () => set({ ...initialState }),
}));

/**
 * The one NavigatorStore for the whole client. It lives as long as the app does, so there is nothing a
 * provider would add: components read it through their hooks, and code outside React - packet
 * handlers, commands - reads and writes it through `getState()`, which is always current.
 */
export const navigatorStore = createNavigatorStore();

export type { ISearchResultList };
