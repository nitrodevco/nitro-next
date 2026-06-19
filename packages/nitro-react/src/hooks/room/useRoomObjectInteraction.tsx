import { NitroLogger, RoomObjectCategoryEnum } from "@nitrodevco/nitro-api";
import { GetRoomEngine } from "@nitrodevco/nitro-renderer";
import type { RoomObjectMouseEvent } from "@nitrodevco/nitro-shared";

import { useRoom } from "./useRoom";
import { useRoomObjectValidation } from "./useRoomObjectValidation";

export const useRoomObjectInteraction = () => {
    const room = useRoom();
    const { getActiveSurfaceLocation } = useRoomObjectValidation();

    const handleMoveTargetFurni = (event: RoomObjectMouseEvent) => {
        const roomObject = room.getRoomObject(event.objectId, RoomObjectCategoryEnum.Floor);

        if (!roomObject) return false;

        const point = getActiveSurfaceLocation(roomObject, event);

        if (point && !GetRoomEngine().moveBlocked) {
            NitroLogger.sendPacket(`new RoomUnitWalkComposer(point.x, point.y)`);

            return true;
        }

        return false;
    };

    return { handleMoveTargetFurni };
}