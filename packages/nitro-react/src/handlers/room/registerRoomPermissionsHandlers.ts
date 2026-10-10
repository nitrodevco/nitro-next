import { RoomControllerLevelEnum } from '@nitrodevco/nitro-api';
import { YouAreControllerMessage, YouAreNotControllerMessage, YouAreNotSpectatorMessage, YouAreOwnerMessage, YouArePlayingGameMessage, YouAreSpectatorMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { navigatorStore } from '#base/context/navigator';
import { getRoom, roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Your own standing in the room - Flash's `RoomPermissionsHandler`: controller level, owner,
 * whether you are playing a game or only spectating (`RoomSessionHandler.onYouAreSpectator`,
 * `RoomMessageHandler.onYouAreNotSpectator`). Everything that gates a menu button or a
 * furniture move reads these.
 */
export const registerRoomPermissionsHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setControllerLevel, setIsRoomOwner, setIsPlayingGame, setIsSpectator } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(YouAreControllerMessage, (data) => {
            setControllerLevel(data.controllerLevel);
        }),

        on(YouAreNotControllerMessage, () => {
            setControllerLevel(RoomControllerLevelEnum.None);
        }),

        on(YouAreOwnerMessage, () => {
            setIsRoomOwner(true);
        }),

        on(YouArePlayingGameMessage, (data) => {
            setIsPlayingGame(data.isPlaying);
        }),

        // `RoomSessionHandler.onYouAreSpectator`: the session of that room spectates.
        on(YouAreSpectatorMessage, (data) => {
            if (getRoom()?.roomId !== data.roomId) return;

            setIsSpectator(true);
        }),

        /*
         * `RoomMessageHandler.onYouAreNotSpectator`: only for the room the user is spectating, and
         * only while they are. `RoomEngine.leaveSpectate` -> `RoomDesktop.enterAfterSpectate` takes
         * the frame away and the room queue widget down; the widgets a spectator went without
         * follow the flag.
         */
        on(YouAreNotSpectatorMessage, (data) => {
            if ((getRoom()?.roomId !== data.roomId) || !roomStore.getState().isSpectator) return;

            setIsSpectator(false);
            navigatorStore.getState().setRoomQueue(undefined);
        }),
    ]);
};
