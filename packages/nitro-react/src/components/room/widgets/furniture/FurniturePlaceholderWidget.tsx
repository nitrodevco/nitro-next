import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { useRoomWidget, useRoomWidgetActions } from '#base/context';
import { FurniturePlaceholderView } from '#base/views/room-widgets/furniture/FurniturePlaceholderView';

/**
 * Furniture whose dialog the client never shipped says so out loud rather than doing nothing.
 * `FurniturePlaceholderLogic` is what the factory falls back to for those, and Flash showed the
 * same apology.
 */
export const FurniturePlaceholderWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.PLACEHOLDER);
    const { closeRoomWidget } = useRoomWidgetActions();

    if (!request) return null;

    return <FurniturePlaceholderView onClose={() => closeRoomWidget(RoomObjectWidgetRequestEvent.PLACEHOLDER)} />;
};
