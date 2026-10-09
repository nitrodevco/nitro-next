// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IQuestMessageData, QuestMessageDataParser } from './QuestsMessage';

export type QuestMessageType = {
    quest: IQuestMessageData;
};

/** Flash `QuestMessageParser`. */
export class QuestMessage implements IIncomingPacket<QuestMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestMessageType {
        return { quest: QuestMessageDataParser(wrapper) };
    }
}
