import { RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { SetCustomStackingHeightComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useRoomFurnitureData } from '#base/hooks';
import { FurnitureStackHeightView } from '#base/views/room-widgets/furniture/FurnitureStackHeightView';

/** Flash hands the tile back to normal stacking by sending this instead of a height. */
const ABOVE_STACK = -100;

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

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.STACK_HEIGHT);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    // Only the walk-magic tiles offer the shared-level toggle, so the flag rides along only there.
    const isWalkMagic = (furnitureData?.furnitureData?.className ?? '').indexOf('tile_walkmagic') === 0;

    const apply = (height: number, multiWalkMode: boolean) => {
        send(new SetCustomStackingHeightComposer({
            objectId: request.objectId,
            height: Math.round(height * 100),
            multiWalkMode: isWalkMagic ? multiWalkMode : undefined,
        }));
    };

    return (
        <FurnitureStackHeightView
            height={roomObject.getLocation()?.z ?? 0}
            multiWalkMode={roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureExtra) === 1}
            isWalkTile={isWalkMagic}
            onApply={apply}
            onAboveStack={() => send(new SetCustomStackingHeightComposer({ objectId: request.objectId, height: ABOVE_STACK }))}
            onClose={onClose}
        />
    );
};
