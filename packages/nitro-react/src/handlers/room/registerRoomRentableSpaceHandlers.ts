import { IRoomWidgetRequest, RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { RentableSpaceRentFailedMessage, RentableSpaceRentOkMessage, RentableSpaceStatusComposer, RentableSpaceStatusMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * A rentable space keeps nothing about the rent on the furni, so the dialog is told by the
 * server: its status fills the widget, and a rent going through or being refused is a reason to
 * ask again rather than to guess.
 */
export const registerRoomRentableSpaceHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const getRequest = () => roomStore.getState().openWidgets[RoomWidgetEnum.RENTABLESPACE] as IRoomWidgetRequest | undefined;
    const { updateRoomWidgetData } = roomStore.getState();

    const refresh = () => {
        const request = getRequest();

        if (!request) return;

        send(new RentableSpaceStatusComposer({ objectId: request.objectId }));
    };

    return subscribeAll(subscribe, [
        on(RentableSpaceStatusMessage, (data) => {
            updateRoomWidgetData(RoomWidgetEnum.RENTABLESPACE, data);
        }),

        on(RentableSpaceRentOkMessage, refresh),
        on(RentableSpaceRentFailedMessage, refresh),
    ]);
};
