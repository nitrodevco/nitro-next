import { GetGuestRoomComposer, NewNavigatorSearchComposer, OpenFlatConnectionComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { navigatorStore } from '#base/context/navigator';
import { systemStore } from '#base/context/system';

type Send = WebSocketConnection['send'];

/** The prefix a tag search carries, as the navigator's own filter menu sends it. */
const TAG_FILTER_PREFIX = 'tag:';

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
 * Clicking one of a room's tags searches for it - `HabboNavigator.performTagSearch` - and opens
 * the navigator on the results. Before the navigator metadata has arrived there is no context to
 * search in, so the filter is only left in place for the navigator to show.
 */
export const searchRoomTag = (send: Send, tag: string) => {
    const { topLevelContext, setFilterType, setSearchFilter, setIsSearching } = navigatorStore.getState();

    setFilterType('tag');
    setSearchFilter(tag);

    if (topLevelContext) {
        setIsSearching(true);

        send(new NewNavigatorSearchComposer({
            searchCodeOriginal: topLevelContext.searchCode,
            // A tag with a space in it is quoted, the way Flash sent it.
            filteringData: TAG_FILTER_PREFIX + (tag.includes(' ') ? `"${tag}"` : tag),
        }));
    }

    systemStore.getState().showWindow('navigator');
};
