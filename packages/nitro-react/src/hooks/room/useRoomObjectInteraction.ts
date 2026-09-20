import { FurnitureUsagePolicyEnum, RoomObjectCategoryEnum, RoomObjectMouseEvent, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { MoveAvatarComposer, SetRandomStateComposer, UseFurnitureComposer, UseWallItemComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomStore } from '#base/context/room';

import { useRoomObjectValidation } from './useRoomObjectValidation';

/**
 * Using furniture: walking to a clicked furni before using it
 * (`RoomObjectEventHandler.handleMoveTargetFurni`) and the state change a click on usable
 * furniture sends (`changeRoomObjectState`) - which, in wired play test mode, only furni everybody
 * may use gets, unless the room frees all furni.
 */
export const useRoomObjectInteraction = () => {
    const room = useRoom();
    const isFreeFurniMovementsMode = useRoomStore(x => x.isFreeFurniMovementsMode);
    const playTestMode = useRoomStore(x => x.playTestMode);
    const { getActiveSurfaceLocation } = useRoomObjectValidation();
    const { send } = useWebSocketContext();

    const handleMoveTargetFurni = (event: RoomObjectMouseEvent) => {
        if (!room) return false;

        const roomObject = room.getRoomObject(event.objectId, RoomObjectCategoryEnum.Floor);

        if (!roomObject) return false;

        const point = getActiveSurfaceLocation(roomObject, event);

        if (point && !room.isMoveBlocked) {
            send(new MoveAvatarComposer({ targetX: point.x, targetY: point.y }));

            return true;
        }

        return false;
    };

    const changeItemState = (objectId: number, category: RoomObjectCategoryEnum, param: number, random: boolean) => {
        const roomObject = room?.getRoomObject(objectId, category);

        if (!roomObject) return false;

        if (!isFreeFurniMovementsMode && playTestMode && ((roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureUsagePolicy) ?? 0) < Number(FurnitureUsagePolicyEnum.Everybody))) return false;

        switch (category) {
            case RoomObjectCategoryEnum.Floor: {
                if (!random) send(new UseFurnitureComposer({ objectId, param }));
                else send(new SetRandomStateComposer({ objectId, param }));
                break;
            }
            case RoomObjectCategoryEnum.Wall: {
                send(new UseWallItemComposer({ objectId, param }));
                break;
            }
        }

        return true;
    };

    return { handleMoveTargetFurni, changeItemState };
};
