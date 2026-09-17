import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { FriendFurniConfirmLockComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { LockConfirmData } from '#base/handlers';
import { FurnitureLockConfirmView } from '#base/views/room-widgets/furniture/FurnitureLockConfirmView';

/**
 * Your half of sealing a friend furni. The dialog is raised by the server rather than by using
 * the furni, and either answer is sent the same way - a refusal is as much of an answer as an
 * agreement, and it releases the other person from waiting.
 */
export const FurnitureLockConfirmWidget = () => {
    const request = useRoomWidget<LockConfirmData>(RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_CONFIRM);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const data = request?.data;

    if (!request || !data) return null;

    const answer = (confirmed: boolean) => {
        send(new FriendFurniConfirmLockComposer({ itemId: data.stuffId, confirmed }));
        closeRoomWidget(RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_CONFIRM);
    };

    return (
        <FurnitureLockConfirmView
            otherLocked={data.otherLocked}
            onConfirm={() => answer(true)}
            onCancel={() => answer(false)}
        />
    );
};
