import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { PresentOpenedMessage } from '@nitrodevco/nitro-packets';

import { useRoomWidgetActions } from '#base/context';
import { useMessageListener } from '#base/hooks';

/**
 * What was inside the gift. The present widget is already open by the time this lands - it was
 * the one that sent the open - so the contents are handed to that open request rather than
 * opening anything of their own.
 */
export const useRoomPresentHandler = () => {
    const { updateRoomWidgetData } = useRoomWidgetActions();

    useMessageListener(PresentOpenedMessage, (data) => {
        updateRoomWidgetData(RoomObjectWidgetRequestEvent.PRESENT, data);
    });
};
