import { RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { useRoomSelector, useRoomWidget, useRoomWidgetActions } from '#base/context';
import { FurnitureTrophyView } from '#base/views/room-widgets/furniture/FurnitureTrophyView';

import { parseTrophyData } from './furnitureWidgetData';

/**
 * The trophy engraving dialog. Everything it shows is already on the object: `furniture_data`
 * holds the owner, the date and the message as one tab-separated string, exactly as Flash's
 * `FurnitureTrophyWidgetHandler` read it. No packets either way.
 */
export const FurnitureTrophyWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.TROPHY);
    const room = useRoomSelector();
    const { closeRoomWidget } = useRoomWidgetActions();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.TROPHY);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    const { ownerName, date, message } = parseTrophyData(roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureData));

    return (
        <FurnitureTrophyView
            color={roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureColor) ?? 0}
            ownerName={ownerName}
            date={date}
            message={message}
            onClose={onClose}
        />
    );
};
