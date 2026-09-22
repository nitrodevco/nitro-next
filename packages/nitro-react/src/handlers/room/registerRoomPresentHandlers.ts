import { PresentOpenedMessage } from '@nitrodevco/nitro-packets';

import { PRESENT_OPENED_WIDGET, PresentOpenedData } from '#base/components/room/widgets/furniture/furnitureWidgetData';
import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * What was inside the gift - `PresentHandler.onPresentOpened` -> `FurniturePresentWidgetHandler`'s
 * `RSPE_PRESENT_OPENED` -> `PresentFurniWidget.onObjectUpdate`'s `RWPDUE_CONTENTS*`. The widget
 * only takes the contents while it is waiting for them (`if(!§_-B28§) return`): the open button
 * put the empty opened card up, and merging into a widget that is not open does nothing, so an
 * answer nobody is waiting for is dropped as Flash dropped it.
 */
export const registerRoomPresentHandlers = ({ subscribe }: WebSocketConnection) => {
    const { mergeRoomWidgetData } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(PresentOpenedMessage, data => mergeRoomWidgetData<PresentOpenedData>(PRESENT_OPENED_WIDGET, { contents: data })),
    ]);
};
