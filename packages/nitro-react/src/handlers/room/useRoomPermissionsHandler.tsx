import { RoomControllerLevelEnum } from "@nitrodevco/nitro-api";
import { YouAreControllerMessage, YouAreNotControllerMessage, YouAreOwnerMessage } from "@nitrodevco/nitro-shared";

import { useRoomPermissionActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomPermissionsHandler = () => {
    const { setControllerLevel, setIsRoomOwner } = useRoomPermissionActions();

    useMessageListener(YouAreControllerMessage, data => {
        setControllerLevel(data.controllerLevel);
    });

    useMessageListener(YouAreNotControllerMessage, data => {
        setControllerLevel(RoomControllerLevelEnum.None);
    });

    useMessageListener(YouAreOwnerMessage, data => {
        setIsRoomOwner(true);
    });
}