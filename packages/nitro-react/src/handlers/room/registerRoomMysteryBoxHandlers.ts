import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { CancelMysteryBoxWaitMessage, GotMysteryBoxPrizeMessage, GotMysteryBoxPrizeMessageType, ShowMysteryBoxWaitMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/** How far along the box is: waiting on the other half, or opened. */
export type MysteryBoxData = {
    waiting: boolean;
    prize?: GotMysteryBoxPrizeMessageType;
};

/**
 * A mystery box takes two people: one brings the box, the other the key. Using it only starts
 * the wait, and the three messages below are the whole conversation - the server says when the
 * wait begins, when it is called off, and what was inside.
 */
export const registerRoomMysteryBoxHandlers = ({ subscribe }: WebSocketConnection) => {
    const { updateRoomWidgetData, closeRoomWidget } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(ShowMysteryBoxWaitMessage, () => {
            updateRoomWidgetData(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG, { waiting: true });
        }),

        on(CancelMysteryBoxWaitMessage, () => {
            closeRoomWidget(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG);
        }),

        on(GotMysteryBoxPrizeMessage, (data) => {
            updateRoomWidgetData(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG, { waiting: false, prize: data });
        }),
    ]);
};
