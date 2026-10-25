import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { AchievementParser } from '../../Data/AchievementParser';
import { IAchievement } from '../../Data/IAchievement';

/** AS3 AchievementMessageParser: one achievement, with cumulative point offsets. */
export type AchievementEventMessageType = { achievement: IAchievement };

export class AchievementEventMessage implements IIncomingPacket<AchievementEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): AchievementEventMessageType {
        return { achievement: AchievementParser(wrapper) };
    }
}
