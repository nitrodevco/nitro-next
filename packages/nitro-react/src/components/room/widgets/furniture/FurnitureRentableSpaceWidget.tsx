import { RoomObjectCategoryEnum, RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { RentableSpaceCancelRentComposer, RentableSpaceRentComposer, RentableSpaceStatusMessageType } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { ClientGates, useClientGate, useOwnCredits, useOwnUserId } from '#base/context/user';
import { isFurnitureOwnedBy } from '#base/utils';
import { FurnitureRentableSpaceView } from '#base/views/room-widgets/furniture/FurnitureRentableSpaceView';

/**
 * A rentable space. Everything it shows belongs to the server rather than to the furni - who
 * holds it, for how long and at what price - so the request handler asks as the widget opens
 * and nothing is drawn until that answer arrives. `RentableSpaceDisplayWidget.populateRentInfo`
 * offers the cancel button to the space's owner or `hasSecurity(5)`
 * (`ClientGates.RentCancelAny`) - not to the renter.
 */
export const FurnitureRentableSpaceWidget = () => {
    const request = useRoomWidget<RentableSpaceStatusMessageType>(RoomWidgetEnum.RENTABLESPACE);
    const ownUserId = useOwnUserId();
    const room = useRoom();
    const cancelsAny = useClientGate(ClientGates.RentCancelAny);
    const credits = useOwnCredits();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const onClose = () => closeRoomWidget(RoomWidgetEnum.RENTABLESPACE);

    const data = request?.data;

    if (!request || !data) return null;

    return (
        <FurnitureRentableSpaceView
            rented={data.rented}
            canCancelRent={data.rented && (isFurnitureOwnedBy(room?.getRoomObject(request.objectId, RoomObjectCategoryEnum.Floor), ownUserId) || cancelsAny)}
            canRent={data.canRent}
            canRentErrorCode={data.canRentErrorCode}
            canAfford={data.price <= credits}
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
