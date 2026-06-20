import { RoomControllerLevelEnum } from "@nitrodevco/nitro-api";
import { YouAreControllerMessage, YouAreNotControllerMessage, YouAreOwnerMessage } from "@nitrodevco/nitro-shared";
import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomPermissionsHandler = () => {
    const { setPermissions, setControllerLevel } = useRoomContext(useShallow(x => ({
        setPermissions: x.setPermissions,
        setControllerLevel: x.setControllerLevel,
    })));

    useMessageListener(YouAreControllerMessage, data => {
        setControllerLevel(data.controllerLevel);
    });

    useMessageListener(YouAreNotControllerMessage, data => {
        setControllerLevel(RoomControllerLevelEnum.None);
    });

    useMessageListener(YouAreOwnerMessage, data => {
        setPermissions(RoomControllerLevelEnum.Owner, true);
    });
}