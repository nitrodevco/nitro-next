// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IQuestMessageData, QuestMessageDataParser } from './QuestsMessage';

export type QuestDailyMessageType = {
    /** The quest offered, or null when there is none left (`landing.view.quest.currenttask.alldone.*`). */
    quest: IQuestMessageData | null;
    /** How many easy and hard quests there are to choose from; read only with a quest, else 0. */
    easyQuestCount: number;
    hardQuestCount: number;
};

/** Flash `QuestDailyMessageParser`: a flag, then - when set - the quest and the two counts. */
export class QuestDailyMessage implements IIncomingPacket<QuestDailyMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestDailyMessageType {
        if (!wrapper.readBoolean()) return { quest: null, easyQuestCount: 0, hardQuestCount: 0 };

        const quest = QuestMessageDataParser(wrapper);
        const easyQuestCount = wrapper.readInt();
        const hardQuestCount = wrapper.readInt();

        return { quest, easyQuestCount, hardQuestCount };
    }
}
