import { RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { RentableSpaceRentFailedMessage, RentableSpaceRentOkMessage, RentableSpaceStatusComposer, RentableSpaceStatusMessage } from '@nitrodevco/nitro-packets';

import { useRoomWidget, useRoomWidgetActions, useWebSocketContext } from '#base/context';
import { useMessageListener } from '#base/hooks';

/**
 * A rentable space keeps nothing about the rent on the furni, so the dialog is told by the
 * server: its status fills the widget, and a rent going through or being refused is a reason to
 * ask again rather than to guess.
 */
export const useRoomRentableSpaceHandler = () => {
    const request = useRoomWidget(RoomWidgetEnum.RENTABLESPACE);
    const { updateRoomWidgetData } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const refresh = () => {
        if (!request) return;

        send(new RentableSpaceStatusComposer({ objectId: request.objectId }));
    };

    useMessageListener(RentableSpaceStatusMessage, (data) => {
        updateRoomWidgetData(RoomWidgetEnum.RENTABLESPACE, data);
    });

    useMessageListener(RentableSpaceRentOkMessage, refresh);
    useMessageListener(RentableSpaceRentFailedMessage, refresh);
};
