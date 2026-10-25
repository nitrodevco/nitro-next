// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IQuestMessageData, QuestMessageDataParser } from './QuestsMessage';

export type QuestCancelledMessageType = {
    expired: boolean;
    quest: IQuestMessageData;
};

/** Flash `QuestCancelledMessageParser`: `expired`, then the quest. */
export class QuestCancelledMessage implements IIncomingPacket<QuestCancelledMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestCancelledMessageType {
        const expired = wrapper.readBoolean();

        return { expired, quest: QuestMessageDataParser(wrapper) };
    }
}
