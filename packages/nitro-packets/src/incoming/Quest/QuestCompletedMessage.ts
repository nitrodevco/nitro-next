// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IQuestMessageData, QuestMessageDataParser } from './QuestsMessage';

export type QuestCompletedMessageType = {
    quest: IQuestMessageData;
    showDialog: boolean;
};

/** Flash `QuestCompletedMessageParser`: the quest, then `showDialog`. */
export class QuestCompletedMessage implements IIncomingPacket<QuestCompletedMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestCompletedMessageType {
        const quest = QuestMessageDataParser(wrapper);

        return { quest, showDialog: wrapper.readBoolean() };
    }
}
