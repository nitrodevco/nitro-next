import { RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { RentableSpaceCancelRentComposer, RentableSpaceRentComposer, RentableSpaceStatusMessageType } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useOwnUserId } from '#base/context/user';
import { FurnitureRentableSpaceView } from '#base/views/room-widgets/furniture/FurnitureRentableSpaceView';

/**
 * A rentable space. Everything it shows belongs to the server rather than to the furni - who
 * holds it, for how long and at what price - so the request handler asks as the widget opens
 * and nothing is drawn until that answer arrives.
 */
export const FurnitureRentableSpaceWidget = () => {
    const request = useRoomWidget<RentableSpaceStatusMessageType>(RoomWidgetEnum.RENTABLESPACE);
    const ownUserId = useOwnUserId();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const onClose = () => closeRoomWidget(RoomWidgetEnum.RENTABLESPACE);

    const data = request?.data;

    if (!request || !data) return null;

    return (
        <FurnitureRentableSpaceView
            rented={data.rented}
            isOwnRent={data.rented && (data.renterId === ownUserId)}
            canRent={data.canRent}
            canRentErrorCode={data.canRentErrorCode}
            renterName={data.renterName}
            timeRemaining={data.timeRemaining}
            price={data.price}
            onRent={() => {
                send(new RentableSpaceRentComposer({ objectId: request.objectId }));
                onClose();
            }}
            onCancelRent={() => {
                send(new RentableSpaceCancelRentComposer({ objectId: request.objectId }));
                onClose();
            }}
            onClose={onClose}
        />
    );
};
