import { FurnitureUsagePolicyEnum, NitroLogger, RoomObjectCategoryEnum, RoomObjectVariableEnum } from "@nitrodevco/nitro-api";
import { MoveAvatarComposer, SetRandomStateComposer, UseFurnitureComposer, UseWallItemComposer, type RoomObjectMouseEvent } from "@nitrodevco/nitro-shared";

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

    const changeItemState = (objectId: number, category: RoomObjectCategoryEnum, param: number, random: boolean) => {
        const roomObject = room?.getRoomObject(objectId, category);

        if (!roomObject) return false;

        switch (category) {
            case RoomObjectCategoryEnum.Floor: {
                if (!random) send(new UseFurnitureComposer({ objectId, param }));
                else send(new SetRandomStateComposer({ objectId, param }));
            }
            case RoomObjectCategoryEnum.Wall: {
                send(new UseWallItemComposer({ objectId, param }));
            }
        }

        return true;
    }

    return { handleMoveTargetFurni, changeItemState };
}