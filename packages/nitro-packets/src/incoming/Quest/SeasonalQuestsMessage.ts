import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IQuestMessageData, QuestMessageDataParser } from './QuestsMessage';

export type SeasonalQuestsMessageType = {
    quests: IQuestMessageData[];
};

/** Flash `SeasonalQuestsMessageParser`: the quests, with no `openWindow` after them. */
export class SeasonalQuestsMessage implements IIncomingPacket<SeasonalQuestsMessageType> {
    public parse(wrapper: IMessageDataWrapper): SeasonalQuestsMessageType {
        const quests: IQuestMessageData[] = [];
        let count = wrapper.readInt();

        while (count-- > 0) quests.push(QuestMessageDataParser(wrapper));

        return { quests };
    }
}
