import { IRoomWidgetRequest, RoomObjectCategoryEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { FriendFurniCancelLockMessage, FriendFurniOtherLockConfirmedMessage, FriendFurniStartConfirmationMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/** What the confirm dialog is told, built up over the three messages that drive it. */
export type LockConfirmData = {
    stuffId: number;
    isOwner: boolean;
    otherLocked: boolean;
};

/**
 * Sealing a friend furni is a conversation between two people and the server: it starts the
 * confirmation on both sides, says when one of them has agreed, and calls the whole thing off
 * if either walks away. None of it comes from the furni's own logic, so this is what opens and
 * closes the dialog.
 *
 * The lock is named in every message, and the open request is the lock being answered, so a
 * second lock elsewhere in the room cannot talk over the dialog on screen.
 */
export const registerRoomFriendFurniHandlers = ({ subscribe }: WebSocketConnection) => {
    const getRequest = () => roomStore.getState().openWidgets[RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_CONFIRM] as IRoomWidgetRequest<LockConfirmData> | undefined;
    const { openRoomWidget, updateRoomWidgetData, mergeRoomWidgetData, closeRoomWidget } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(FriendFurniStartConfirmationMessage, (data) => {
            openRoomWidget({
                type: RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_CONFIRM,
                objectId: data.stuffId,
                category: RoomObjectCategoryEnum.Floor,
                objectType: '',
            });
            updateRoomWidgetData(RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_CONFIRM, {
                stuffId: data.stuffId,
                isOwner: data.isOwner,
                otherLocked: false,
            });
        }),

        on(FriendFurniOtherLockConfirmedMessage, (data) => {
            if (getRequest()?.objectId !== data.stuffId) return;

            mergeRoomWidgetData<LockConfirmData>(RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_CONFIRM, { otherLocked: true });
        }),

        on(FriendFurniCancelLockMessage, (data) => {
            if (getRequest()?.objectId !== data.stuffId) return;

            closeRoomWidget(RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_CONFIRM);
        }),
    ]);
};
