import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { FurnitureAlertView } from '#base/views/room-widgets/furniture/FurnitureAlertView';

/**
 * A resolution trophy whose achievement was not reached in time. There is nothing to do about
 * it, so the furni only says so.
 */
export const FurnitureAchievementFailedWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_FAILED);
    const { closeRoomWidget } = useRoomWidgetActions();

    if (!request) return null;

    return (
        <FurnitureAlertView
            captionKey="resolution.failed.title"
            subtitleKey="resolution.failed.subtitle"
            messageKey="resolution.failed.text"
            onClose={() => closeRoomWidget(RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_FAILED)}
        />
    );
};
