import { RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { PresentOpenComposer, PresentOpenedMessageType } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useSystemStore } from '#base/context/system';
import { useOwnUserId } from '#base/context/user';
import { FurniturePresentView } from '#base/views/room-widgets/furniture/FurniturePresentView';

/**
 * A wrapped gift. The note and the sender come off the object; what is inside only arrives when
 * the server answers the open, which `registerRoomPresentHandlers` deposits on this request. Only the
 * person it was placed for can open it, which is the owner check Flash made. Whether the sender
 * is trusted (`FurniturePresentLogic` reads it off the gift's data) picks the banner and the
 * card - `FurniturePresentWidgetHandler` passed it on the same way.
 */
export const FurniturePresentWidget = () => {
    const request = useRoomWidget<PresentOpenedMessageType>(RoomObjectWidgetRequestEvent.PRESENT);
    const room = useRoom();
    const ownUserId = useOwnUserId();
    const floorItems = useSystemStore(x => x.floorItems);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.PRESENT);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    const opened = request.data;
    const openedProduct = opened && (floorItems[opened.classId]?.localizedName ?? opened.productCode);

    const onOpen = () => {
        send(new PresentOpenComposer({ objectId: request.objectId }));
        // Flash stops the pick-up animation the moment the box is opened, so the reveal is not
        // interrupted by the furni being tidied away underneath it.
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureDisablePickingAnimation, 1);
    };

    return (
        <FurniturePresentView
            message={roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureData) ?? ''}
            purchaserName={roomObject.model.getValue<string>(RoomObjectVariableEnum.FurniturePurchaserName) ?? ''}
            trustedSender={roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureTrustedSender) === 1}
            openedProduct={openedProduct}
            canOpen={roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId) === ownUserId}
            onOpen={onOpen}
            onClose={onClose}
        />
    );
};
