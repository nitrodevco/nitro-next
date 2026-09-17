import { RoomControllerLevelEnum, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { RemoveItemComposer, SetItemDataComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomStore, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { FurnitureStickieView } from '#base/views/room-widgets/furniture/FurnitureStickieView';

import { parseStickieData } from './furnitureWidgetData';

/**
 * The post-it dialog, and the one widget that proves the bridge runs in both directions: a save
 * goes out as `SetItemDataComposer`, the server answers with an item-data update, the logic
 * re-fires its widget request, and the request's bumped sequence brings us back here to re-read
 * the model. Nothing has to subscribe to the packet.
 *
 * `furniture_itemdata` holds the colour and the text in one string, split at the first space -
 * the same parse Flash's `FurnitureStickieWidgetHandler` did, down to the six-character floor
 * below which there is nothing worth showing.
 */
export const FurnitureStickieWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.STICKIE);
    const room = useRoom();
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const controllerLevel = useRoomStore(x => x.controllerLevel);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.STICKIE);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    const stickie = parseStickieData(roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureItemdata));

    if (!stickie) return null;

    const { colorHex, text } = stickie;

    const onSave = (color: string, message: string) => {
        send(new SetItemDataComposer({ itemId: request.objectId, colorHex: color, text: message }));
    };

    const onDelete = () => {
        send(new RemoveItemComposer({ itemId: request.objectId }));
        onClose();
    };

    return (
        <FurnitureStickieView
            objectType={roomObject.type}
            colorHex={colorHex}
            text={text}
            canModify={isRoomOwner || controllerLevel >= RoomControllerLevelEnum.Guest}
            onSave={onSave}
            onDelete={onDelete}
            onClose={onClose}
        />
    );
};
