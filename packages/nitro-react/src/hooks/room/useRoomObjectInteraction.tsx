import { NitroLogger, RoomObjectCategoryEnum } from "@nitrodevco/nitro-api";
import { MoveAvatarComposer, type RoomObjectMouseEvent } from "@nitrodevco/nitro-shared";

import { useRoomIsMoveBlocked, useRoomSelector, useWebSocketContext } from "#base/context";

import { useRoomObjectValidation } from "./useRoomObjectValidation";

export const useRoomObjectInteraction = () => {
    const room = useRoomSelector();
    const isMoveBlocked = useRoomIsMoveBlocked();
    const { getActiveSurfaceLocation } = useRoomObjectValidation();
    const { send } = useWebSocketContext();

    const handleMoveTargetFurni = (event: RoomObjectMouseEvent) => {
        if (!room) return false;

        const roomObject = room.getRoomObject(event.objectId, RoomObjectCategoryEnum.Floor);

        if (!roomObject) return false;

        const point = getActiveSurfaceLocation(roomObject, event);

        if (point && !isMoveBlocked) {
            send(new MoveAvatarComposer({ targetX: point.x, targetY: point.y }));

            return true;
        }

        return false;
    };

    return { handleMoveTargetFurni };
}