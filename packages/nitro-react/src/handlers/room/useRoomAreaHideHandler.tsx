import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { AreaHideMessage } from '@nitrodevco/nitro-packets';

import { useRoomSelector, useRoomWidget, useRoomWidgetActions } from '#base/context';
import { useMessageListener } from '#base/hooks';

/** What the server has told an open area-hide dialog since it opened. */
export type AreaHideData = {
    /** Whether the furni is hiding its area right now. */
    isOn: boolean;
};

/**
 * An area-hide furni being switched on or off. The furni itself does nothing visible; what it
 * hides is a hole in the room's floor plane, so the news goes to the room rather than to the
 * object that sent it, exactly as `RoomMessageHandler.onAreaHide` did.
 *
 * The areas already in force when you enter a room arrive with the floor map instead, and are
 * applied by `useRoomMappingHandler` once that map is in place.
 */
export const useRoomAreaHideHandler = () => {
    const room = useRoomSelector();
    const request = useRoomWidget<AreaHideData>(RoomObjectWidgetRequestEvent.AREA_HIDE);
    const { mergeRoomWidgetData } = useRoomWidgetActions();

    useMessageListener(AreaHideMessage, ({ areaHideMessageData: data }) => {
        if (!room) return;

        room.updateAreaHide(data.furniId, data.on, data.rootX, data.rootY, data.width, data.length, data.invert);

        // Whoever has this furni's dialog open sees the switch flip, whether they flipped it or
        // somebody else did. The furni's own state sits on a room object model, which nothing
        // re-reads on its own.
        if (request?.objectId === data.furniId) mergeRoomWidgetData<AreaHideData>(RoomObjectWidgetRequestEvent.AREA_HIDE, { isOn: data.on });
    });
};
