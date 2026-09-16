import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { CancelMysteryBoxWaitMessage, GotMysteryBoxPrizeMessage, GotMysteryBoxPrizeMessageType, ShowMysteryBoxWaitMessage } from '@nitrodevco/nitro-packets';

import { useRoomWidgetActions } from '#base/context';
import { useMessageListener } from '#base/hooks';

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
export const useRoomMysteryBoxHandler = () => {
    const { updateRoomWidgetData, closeRoomWidget } = useRoomWidgetActions();

    useMessageListener(ShowMysteryBoxWaitMessage, () => {
        updateRoomWidgetData(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG, { waiting: true });
    });

    useMessageListener(CancelMysteryBoxWaitMessage, () => {
        closeRoomWidget(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG);
    });

    useMessageListener(GotMysteryBoxPrizeMessage, (data) => {
        updateRoomWidgetData(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG, { waiting: false, prize: data });
    });
};
