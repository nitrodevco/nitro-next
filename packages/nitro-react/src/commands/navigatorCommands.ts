import { RoomTradeModeEnum } from '@nitrodevco/nitro-api';
import { CreateFlatComposer, CreateFlatComposerType, EditEventComposer, GetCustomRoomFilterComposer, GetGuestRoomComposer, GetHabboGroupDetailsComposer, NewNavigatorSearchComposer, OpenFlatConnectionComposer, SetNewNavigatorWindowPreferencesComposer, UpdateRoomCategoryAndTradeSettingsComposer, UpdateRoomFilterComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { groupStore } from '#base/context/groups';
import { navigatorStore } from '#base/context/navigator';
import { systemStore } from '#base/context/system';

type Send = WebSocketConnection['send'];

/** The prefixes a tag and an owner search carry, as the navigator's own filter menu sends them. */
const TAG_FILTER_PREFIX = 'tag:';
const OWNER_FILTER_PREFIX = 'owner:';

/** The All Rooms tab - where `HabboNewNavigator` sends every search made from outside the window. */
const HOTEL_VIEW_SEARCH_CODE = 'hotel_view';
/** The navigator's My World tab. */
const MY_WORLD_SEARCH_CODE = 'myworld_view';

/**
 * `HabboNavigator.goToRoom` -> `RoomSessionManager.gotoRoom` -> `RoomSession.start()`: sends
 * the OpenFlatConnection (unless the server is opening the connection itself, Flash's
 * `skipOpc`) and starts the room session right away - RSE_STARTED is what makes the room
 * engine create the room and the UI leave the hotel view, before any reply from the server.
 */
export const goToRoom = (send: Send, roomId: number, password: string = '', skipOpenConnection: boolean = false) => {
    if (!skipOpenConnection) send(new OpenFlatConnectionComposer({ roomId, password, unknown1: -1 }));

    systemStore.getState().startRoomSession(roomId);
};

/**
 * `HabboNewNavigator.goToRoom(roomId)` / `IncomingMessages.forwardToRoom`: a room forward
 * asks for the room info with roomForward set and closes the navigator window. The
 * GetGuestRoomResult handler then starts the session, or shows the doorbell / password
 * popup first for a locked room.
 */
export const forwardToRoom = (send: Send, roomId: number) => {
    send(new GetGuestRoomComposer({ roomId, enterRoom: false, roomForward: true }));

    systemStore.getState().hideWindow('navigator');
};

/**
 * `HabboNavigator.goToHomeRoom` -> `HabboNewNavigator.goToHomeRoom`: the home room is entered
 * through a room forward (`goToRoom(homeRoomId, "external")`), so a locked or password
 * protected home room still shows its popup. Returns false when no home room is set.
 */
export const goToHomeRoom = (send: Send) => {
    const { homeRoomId } = systemStore.getState();

    if (homeRoomId < 1) return false;

    forwardToRoom(send, homeRoomId);

    return true;
};

/**
 * `HabboNewNavigator.performSearch`: the same search answered in the last 4 s (`NavigatorCache`)
 * is shown again without asking; anything else is sent, and kept as the search the refresh button
 * repeats. Either way the navigator opens. The window is not touched until the results land -
 * `setSearchResult` then selects the tab they answer and puts their filter back in the drop menu
 * and the field, as `NavigatorView.onSearchResults` does, so a search made from anywhere reads as
 * though it was typed there.
 */
export const performNavigatorSearch = (send: Send, searchCode: string, filteringData: string = '') => {
    const { setIsSearching, getCachedSearchResult, receiveSearchResult, setLastSearch } = navigatorStore.getState();

    setIsSearching(true);

    const cached = getCachedSearchResult(searchCode, filteringData);

    if (cached) {
        receiveSearchResult(cached);
    } else {
        setLastSearch({ searchCode, filteringData });
        send(new NewNavigatorSearchComposer({ searchCodeOriginal: searchCode, filteringData }));
    }

    systemStore.getState().showWindow('navigator');
};

/** `NavigatorView.update`: the preferences go to the server at most this often. */
const WINDOW_PREFERENCES_INTERVAL_MS = 5000;

/**
 * `NavigatorView.update`'s first step, run every second once the window has been created: when the
 * window has moved, changed height or shown or hidden its left pane, and the last send is more than
 * 5 s old, `sendWindowPreferences` (`SetNewNavigatorWindowPreferencesMessageComposer`, results mode
 * always 0). The width goes with them but is not compared.
 *
 * The first run takes the window as it was created (`createMainWindow`): the preferences the server
 * sent, or the window's own place and size when there were none - with the left pane counted as
 * hidden, which is `_lastLeftPaneHidden`'s default.
 */
export const syncNavigatorWindowPreferences = (send: Send) => {
    const { windowGeometry, sentWindowPreferences, leftPaneHidden, preferences, setSentWindowPreferences } = navigatorStore.getState();

    if (!windowGeometry) return;

    const now = Date.now();
    const leftPaneVisible = !leftPaneHidden;

    if (!sentWindowPreferences) {
        setSentWindowPreferences(preferences
            ? { x: preferences.windowX, y: preferences.windowY, width: preferences.windowWidth, height: preferences.windowHeight, leftPaneVisible, sentAt: now }
            : { ...windowGeometry, leftPaneVisible: false, sentAt: now });

        return;
    }

    // `windowPreferencesChanged`.
    const changed = (sentWindowPreferences.leftPaneVisible !== leftPaneVisible)
        || (sentWindowPreferences.x !== windowGeometry.x)
        || (sentWindowPreferences.y !== windowGeometry.y)
        || (sentWindowPreferences.height !== windowGeometry.height);

    if (!changed || ((now - sentWindowPreferences.sentAt) <= WINDOW_PREFERENCES_INTERVAL_MS)) return;

    setSentWindowPreferences({ ...windowGeometry, leftPaneVisible, sentAt: now });

    send(new SetNewNavigatorWindowPreferencesComposer({ ...windowGeometry, openSavedSearches: leftPaneVisible, resultsMode: 0 }));
};

/** `RoomEventViewCtrl.save`: the running event's new name and description. */
export const editRoomEvent = (send: Send, adId: number, name: string, description: string) => send(new EditEventComposer({ id: adId, name, description }));

/**
 * `EnforceCategoryCtrl`'s OK: the room the user is in gets the category and trade mode picked
 * (`UpdateRoomCategoryAndTradeSettingsComposer`), and the dialog closes.
 */
export const enforceRoomCategory = (send: Send, roomId: number, categoryId: number, tradeType: RoomTradeModeEnum) => {
    send(new UpdateRoomCategoryAndTradeSettingsComposer({ roomId, categoryId, tradeType }));

    navigatorStore.getState().setEnforceCategorySelectionType(undefined);
};

/** `RoomFilterCtrl.startRoomFilterEdit`: the room's words are asked for and the window shown. */
export const openRoomFilter = (send: Send, flatId: number) => {
    navigatorStore.getState().setRoomFilterFlatId(flatId);

    send(new GetCustomRoomFilterComposer({ roomId: flatId }));

    systemStore.getState().showWindow('room_filter');
};

/**
 * `RoomFilterCtrl.addBadWord`: any word that is not empty is sent, and the list asked for again -
 * the server answers with the words it kept.
 */
export const addRoomFilterWord = (send: Send, word: string) => {
    const { roomFilterFlatId } = navigatorStore.getState();

    if (!word.length) return;

    send(new UpdateRoomFilterComposer({ roomId: roomFilterFlatId, isAddingWord: true, word }));
    send(new GetCustomRoomFilterComposer({ roomId: roomFilterFlatId }));
};

/** `RoomFilterCtrl.onRemoveWordClick`: the selected word leaves the list here and is sent; the list is not asked for again. */
export const removeRoomFilterWord = (send: Send) => {
    const { roomFilterFlatId, roomFilterWords, roomFilterSelectedIndex, removeRoomFilterWord: removeWord } = navigatorStore.getState();
    const word = roomFilterWords[roomFilterSelectedIndex];

    if (word === undefined) return;

    removeWord(word);

    send(new UpdateRoomFilterComposer({ roomId: roomFilterFlatId, isAddingWord: false, word }));
};

/** `RoomFilterCtrl.disposeWindow` - its close button: the window and its words go. */
export const closeRoomFilter = () => {
    navigatorStore.getState().clearRoomFilter();
    systemStore.getState().hideWindow('room_filter');
};

/** `HabboNewNavigator.performLastSearch` - the refresh button: the last search sent, past the cache. */
export const refreshNavigatorSearch = (send: Send) => {
    const { lastSearch, removeCachedSearchResult } = navigatorStore.getState();

    if (!lastSearch) return;

    removeCachedSearchResult(lastSearch.searchCode, lastSearch.filteringData);
    performNavigatorSearch(send, lastSearch.searchCode, lastSearch.filteringData);
};

/**
 * `HabboNewNavigator.toggle` - the toolbar's navigator icon (`HTIE_ICON_NAVIGATOR`): the window
 * shown or hidden, and when shown, the last search sent again past the cache (`performLastSearch`),
 * so the counts are the hotel's now rather than the list's from whenever it was last fetched.
 */
export const toggleNavigator = (send: Send) => {
    const { visibleWindows, showWindow, hideWindow } = systemStore.getState();

    if (visibleWindows.navigator) {
        hideWindow('navigator');

        return;
    }

    showWindow('navigator');
    refreshNavigatorSearch(send);
};

/**
 * `HabboNewNavigator.goBack` - a block's `category_back`: the search before this one, which is not
 * added to the history again when it answers.
 */
export const goBackNavigatorSearch = (send: Send) => {
    const previous = navigatorStore.getState().stepBackSearchHistory();

    if (previous) performNavigatorSearch(send, previous.searchCode, previous.filteringData);
};

/**
 * Clicking one of a room's tags searches every room for it - the new navigator's
 * `performTagSearch`, which (unlike the legacy one) sends the tag unquoted.
 */
export const searchRoomTag = (send: Send, tag: string) => performNavigatorSearch(send, HOTEL_VIEW_SEARCH_CODE, TAG_FILTER_PREFIX + tag);

/**
 * A free-text navigator search, as `navigator/search/<text>` links ask for - the rentable bots'
 * search skill (14) uses one. `HabboNewNavigator.linkReceived` searches `hotel_view` with it.
 */
export const searchNavigator = (send: Send, text: string) => performNavigatorSearch(send, HOTEL_VIEW_SEARCH_CODE, text);

/** `LegacyNavigator.showOwnRooms` - the Me menu's rooms button: the navigator opened on My World. */
export const showOwnRooms = (send: Send) => performNavigatorSearch(send, MY_WORLD_SEARCH_CODE);

/**
 * `ExtendedProfileWindowCtrl`'s rooms link: every room the user owns, in the All Rooms tab with
 * the owner filter selected and their name in the field.
 */
export const searchRoomsByOwner = (send: Send, userName: string) => performNavigatorSearch(send, HOTEL_VIEW_SEARCH_CODE, OWNER_FILTER_PREFIX + userName);

/**
 * `NavigatorView.showRoomInfoBubbleAt`: a room of a group whose details the client has not been
 * told yet asks for them (`getGuildInfo(habboGroupId, false)` - the answer only, no window), so
 * the room info bubble can show the group's mode icons once they arrive. `HabboNewNavigator` kept
 * its own cache of `HabboGroupDetailsData`; here it is the groups' one, filled by the same packet.
 */
export const requestRoomGroupDetails = (send: Send, groupId: number) => {
    if ((groupId <= 0) || groupStore.getState().detailsById[groupId]) return;

    send(new GetHabboGroupDetailsComposer({ groupId, openDetails: false }));
};

/** `RoomCreateViewCtrl.onCreateButtonClick`: the server answers with `FlatCreatedMessage`. */
export const createFlat = (send: Send, room: CreateFlatComposerType) => send(new CreateFlatComposer(room));
