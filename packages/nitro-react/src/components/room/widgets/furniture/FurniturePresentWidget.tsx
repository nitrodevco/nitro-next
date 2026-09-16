import { RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { PresentOpenComposer, PresentOpenedMessageType } from '@nitrodevco/nitro-packets';

import { useFurnitureDataSelector, useOwnUserId, useRoomSelector, useRoomWidget, useRoomWidgetActions, useWebSocketContext } from '#base/context';
import { useRoomPresentHandler } from '#base/handlers';
import { FurniturePresentView } from '#base/views/room-widgets/furniture/FurniturePresentView';

/**
 * A wrapped gift. The note and the sender come off the object; what is inside only arrives when
 * the server answers the open, which `useRoomPresentHandler` deposits on this request. Only the
 * person it was placed for can open it, which is the owner check Flash made.
 */
export const FurniturePresentWidget = () => {
    // Only this dialog is told these things, and only while it is open.
    useRoomPresentHandler();

    const request = useRoomWidget<PresentOpenedMessageType>(RoomObjectWidgetRequestEvent.PRESENT);
    const room = useRoomSelector();
    const ownUserId = useOwnUserId();
    const { floorItems } = useFurnitureDataSelector();
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
            openedProduct={openedProduct}
            canOpen={roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId) === ownUserId}
            onOpen={onOpen}
            onClose={onClose}
        />
    );
};
