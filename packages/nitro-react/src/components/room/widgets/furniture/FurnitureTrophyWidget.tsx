import { RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { parseTrophyData } from '#base/utils';
import { FurnitureTrophyView } from '#base/views/room-widgets/furniture/FurnitureTrophyView';

/**
 * The trophy engraving dialog. Everything it shows is already on the object: `furniture_data`
 * holds the owner, the date and the message as one tab-separated string, exactly as Flash's
 * `FurnitureTrophyWidgetHandler` read it. No packets either way.
 */
export const FurnitureTrophyWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.TROPHY);
    const room = useRoom();
    const { closeRoomWidget } = useRoomWidgetActions();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.TROPHY);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    const { ownerName, date, message } = parseTrophyData(roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureData));

    return (
        <FurnitureTrophyView
            // `TrophyFurniWidget`: `TrophyTheme.normalize(color - 1)` - the furni's colours count from 1 (`prizetrophy*1` is gold).
            color={(roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureColor) ?? 0) - 1}
            ownerName={ownerName}
            date={date}
            message={message}
            onClose={onClose}
        />
    );
};
