import { PollContentsEventMessage, PollErrorEventMessage, PollOfferEventMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Polls the server offers. The offer arrives first with nothing but its headline and summary; the
 * questions follow only once the user has said yes, which is what `PollStartComposer` asks for.
 */
export const registerRoomPollHandlers = ({ subscribe }: WebSocketConnection) => {
    const { offerPoll, setPollContents, setPollError } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(PollOfferEventMessage, (data) => {
            offerPoll(data.id, data.headline, data.summary);
        }),

        on(PollContentsEventMessage, (data) => {
            setPollContents(data);
        }),

        // The 2026 client's own parser reads nothing off this, so all it can say is that one failed.
        on(PollErrorEventMessage, () => {
            setPollError('poll_error');
        }),
    ]);
};
