import { RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { CreditFurniRedeemComposer } from '@nitrodevco/nitro-packets';

import { useRoomSelector, useRoomWidget, useRoomWidgetActions, useWebSocketContext } from '#base/context';
import { FurnitureCreditView } from '#base/views/room-widgets/furniture/FurnitureCreditView';

/**
 * The credit furni prompt. `FurnitureCreditLogic` reads the value off the furni's data when it
 * initialises, so the dialog needs no packet to open - only to redeem.
 */
export const FurnitureCreditWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.CREDITFURNI);
    const room = useRoomSelector();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.CREDITFURNI);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    const onExchange = () => {
        send(new CreditFurniRedeemComposer({ objectId: request.objectId }));
        onClose();
    };

    return (
        <FurnitureCreditView
            value={roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureCreditValue) ?? 0}
            onExchange={onExchange}
            onClose={onClose}
        />
    );
};
