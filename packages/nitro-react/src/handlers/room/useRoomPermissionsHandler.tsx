import { RoomControllerLevelEnum } from "@nitrodevco/nitro-api";
import { YouAreControllerMessage, YouAreNotControllerMessage, YouAreNotSpectatorMessage, YouAreOwnerMessage, YouArePlayingGameMessage } from "@nitrodevco/nitro-shared";

import { useRoomPermissionActions, useRoomSessionActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomPermissionsHandler = () => {
    const { setControllerLevel, setIsRoomOwner } = useRoomPermissionActions();
    const { setIsPlayingGame, setIsSpectator } = useRoomSessionActions();

    useMessageListener(YouAreControllerMessage, data => {
        setControllerLevel(data.controllerLevel);
    });

    useMessageListener(YouAreNotControllerMessage, data => {
        setControllerLevel(RoomControllerLevelEnum.None);
    });

    useMessageListener(YouAreOwnerMessage, data => {
        setIsRoomOwner(true);
    });

    useMessageListener(YouArePlayingGameMessage, data => {
        setIsPlayingGame(data.isPlaying);
    });

    useMessageListener(YouAreNotSpectatorMessage, data => {
        setIsSpectator(false);
    });
}