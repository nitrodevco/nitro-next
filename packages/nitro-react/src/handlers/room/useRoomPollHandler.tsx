import { PollContentsEventMessage, PollErrorEventMessage, PollOfferEventMessage } from '@nitrodevco/nitro-packets';

import { useMessageListener } from '#base/hooks';

export const useRoomPollHandler = () => {
    useMessageListener(PollContentsEventMessage, (data) => {
    });

    useMessageListener(PollOfferEventMessage, (data) => {
    });

    useMessageListener(PollErrorEventMessage, (data) => {
    });
};
