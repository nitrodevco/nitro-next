import { RoomObjectUserType } from '@nitrodevco/nitro-api';

import { useUserStore } from '#base/context/user';

import { useRoomObjectIdByWebId } from '../useRoomObjectIdByWebId';

/**
 * The room object your own avatar stands as - Flash's `RoomSession.ownUserRoomId`, answered the
 * way `InfoStandWidgetHandler.handleGetUserInfoMessage` tells own from peer: by the unit's `webID`,
 * never by a remembered index. The store's `ownRoomIndex` is written only where the own user id was
 * already known as the unit arrived (`RoomMessageHandler.onUsers` against its `_ownUserId`), and
 * the user object that fills it in is the answer to the `InfoRetrieveComposer` `MainView` sends
 * after the packets queued while the UI mounted have been dispatched. A room whose `Users` sat in
 * that queue is entered before the id is known, and the index then stays -1 for the whole session -
 * which is what made the object menu open the peer menu over your own avatar. The web id index is
 * filled for every unit as it arrives, so this answers whichever order the two packets come in.
 */
export const useOwnRoomObjectId = () => {
    const ownUserId = useUserStore(x => x.userId);

    return useRoomObjectIdByWebId(ownUserId, RoomObjectUserType.User) ?? -1;
};
