import { RoomControllerLevelEnum } from '@nitrodevco/nitro-api';
import { YouAreControllerMessage, YouAreNotControllerMessage, YouAreNotSpectatorMessage, YouAreOwnerMessage, YouArePlayingGameMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Your own standing in the room - Flash's `RoomPermissionsHandler`: controller level, owner,
 * whether you are playing a game or only spectating. Everything that gates a menu button or a
 * furniture move reads these.
 */
export const registerRoomPermissionsHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setControllerLevel, setIsRoomOwner, setIsPlayingGame, setIsSpectator } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(YouAreControllerMessage, (data) => {
            setControllerLevel(data.controllerLevel);
        }),

        on(YouAreNotControllerMessage, (data) => {
            setControllerLevel(RoomControllerLevelEnum.None);
        }),

        on(YouAreOwnerMessage, (data) => {
            setIsRoomOwner(true);
        }),

        on(YouArePlayingGameMessage, (data) => {
            setIsPlayingGame(data.isPlaying);
        }),

        on(YouAreNotSpectatorMessage, (data) => {
            setIsSpectator(false);
        }),
    ]);
};
