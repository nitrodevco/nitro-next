import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { RoomLinkData } from '#base/handlers';
import { useGoToRoom } from '#base/hooks';
import { FurnitureRoomLinkView } from '#base/views/room-widgets/furniture/FurnitureRoomLinkView';

import { readFurnitureLink } from './furnitureWidgetData';

/**
 * A teleport that leads to another room. The request handler asks the navigator about the room
 * as it opens, and this waits for an answer that is actually about the room the furni points
 * at - room info arrives for plenty of other reasons - before offering to take you there.
 */
export const FurnitureRoomLinkWidget = () => {
    const request = useRoomWidget<RoomLinkData>(RoomObjectWidgetRequestEvent.ROOM_LINK);
    const room = useRoom();
    const { closeRoomWidget } = useRoomWidgetActions();
    const goToRoom = useGoToRoom();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.ROOM_LINK);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);
    const data = request.data;

    if (!roomObject || !data) return null;

    const targetRoomId = parseInt(readFurnitureLink(roomObject) ?? '', 10);

    if (isNaN(targetRoomId) || (data.roomId !== targetRoomId)) return null;

    return (
        <FurnitureRoomLinkView
            roomName={data.roomName}
            ownerName={data.ownerName}
            onConfirm={() => {
                goToRoom(targetRoomId);
                onClose();
            }}
            onCancel={onClose}
        />
    );
};
