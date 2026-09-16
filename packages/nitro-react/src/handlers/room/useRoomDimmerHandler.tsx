import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { RoomDimmerPresetsMessage } from '@nitrodevco/nitro-packets';

import { useRoomWidgetActions } from '#base/context';
import { useMessageListener } from '#base/hooks';

/**
 * The room's three saved dimmer moods. They only ever arrive because the dialog asked for them,
 * so they are handed to that open request rather than kept anywhere of their own.
 */
export const useRoomDimmerHandler = () => {
    const { updateRoomWidgetData } = useRoomWidgetActions();

    useMessageListener(RoomDimmerPresetsMessage, (data) => {
        updateRoomWidgetData(RoomObjectWidgetRequestEvent.DIMMER, data);
    });
};
