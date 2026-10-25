import { RoomObjectCategoryEnum, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent, RoomRenderedEvent } from '@nitrodevco/nitro-api';
import { SetAdjacentCustomStackingHeightComposer, SetCustomStackingHeightComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useRoomEventSnapshot, useRoomFurnitureData } from '#base/hooks';
import { FurnitureStackHeightView } from '#base/views/room-widgets/furniture/FurnitureStackHeightView';

/** Flash hands the tile back to normal stacking by sending this instead of a height. */
const ABOVE_STACK = -100;

/**
 * Where the furni stands, looked at once a frame: `FurnitureCustomStackHeightWidgetHandler.update`
 * reads the helper's z every update and hands a change to the window, so a height the server
 * picked (Move up / down, place on top, a clamp) shows in the input as the helper moves.
 */
const ROOM_RENDERED = [ RoomRenderedEvent.ROOM_RENDERED ];

const useRoomObjectZ = (objectId: number, category: RoomObjectCategoryEnum): number =>
    useRoomEventSnapshot(ROOM_RENDERED, room => room?.getRoomObject(objectId, category)?.getLocation()?.z ?? 0);

/**
 * The stacking helper. Its current height is simply where the furni sits - the z of its own
 * location - and the walk-together toggle is the `furniture_extra` flag, both read the way
 * Flash's handler did. Heights travel in hundredths of a tile.
 */
export const FurnitureStackHeightWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.STACK_HEIGHT);
    const room = useRoom();
    const furnitureData = useRoomFurnitureData(request?.objectId ?? -1, request?.category ?? 0);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const height = useRoomObjectZ(request?.objectId ?? -1, request?.category ?? 0);

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.STACK_HEIGHT);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    // Only the walk-magic tiles offer the shared-level toggle, so the flag rides along only there.
    const isWalkMagic = (furnitureData?.furnitureData?.className ?? '').indexOf('tile_walkmagic') === 0;

    // Only the checkbox sends the flag (`onMultiWalkChange`); every other height goes out as two ints (`sendCurrentHeight`).
    const apply = (height: number, multiWalkMode?: boolean) => {
        send(new SetCustomStackingHeightComposer({
            objectId: request.objectId,
            height: Math.round(height * 100),
            multiWalkMode: isWalkMagic ? multiWalkMode : undefined,
        }));
    };

    return (
        <FurnitureStackHeightView
            height={height}
            multiWalkMode={roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureExtra) === 1}
            isWalkTile={isWalkMagic}
            onApply={apply}
            onAboveStack={() => send(new SetCustomStackingHeightComposer({ objectId: request.objectId, height: ABOVE_STACK }))}
            onMoveAdjacent={down => send(new SetAdjacentCustomStackingHeightComposer({ objectId: request.objectId, down }))}
            onClose={onClose}
        />
    );
};
