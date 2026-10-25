import { RoomObjectVariableEnum, RoomObjectWidgetRequestEvent, StringDataType } from '@nitrodevco/nitro-api';

import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useRoomFurnitureData } from '#base/hooks';
import { FurnitureEngravingView } from '#base/views/room-widgets/furniture/FurnitureEngravingView';

/**
 * A locked friend furni - a love lock and its seasonal cousins. Once locked it holds the two
 * people in it: their names at 1 and 2, their looks at 3 and 4, and the day at 5, exactly as
 * `FriendFurniEngravingView` read them.
 */
export const FurnitureEngravingWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_ENGRAVING);
    const room = useRoom();
    const furnitureData = useRoomFurnitureData(request?.objectId ?? -1, request?.category ?? 0);
    const { closeRoomWidget } = useRoomWidgetActions();

    if (!request || !room || !(furnitureData?.stuffData instanceof StringDataType)) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    const stuffData = furnitureData.stuffData;

    return (
        <FurnitureEngravingView
            engravingType={roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureFriendfurniEngraving) ?? 0}
            leftName={stuffData.getValue(1)}
            rightName={stuffData.getValue(2)}
            leftFigure={stuffData.getValue(3)}
            rightFigure={stuffData.getValue(4)}
            date={stuffData.getValue(5)}
            onClose={() => closeRoomWidget(RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_ENGRAVING)}
        />
    );
};
