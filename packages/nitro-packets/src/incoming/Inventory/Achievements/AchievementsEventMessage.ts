import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { AchievementParser } from '../../Data/AchievementParser';
import { IAchievement } from '../../Data/IAchievement';

/** AS3 AchievementsMessageParser: ordered records followed by the preferred category. */
export type AchievementsEventMessageType = { achievements: IAchievement[]; defaultCategory: string };

export class AchievementsEventMessage implements IIncomingPacket<AchievementsEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): AchievementsEventMessageType {
        const count = wrapper.readInt();
        const achievements: IAchievement[] = [];

        for (let i = 0; i < count; i++) achievements.push(AchievementParser(wrapper));

        return { achievements, defaultCategory: wrapper.readString() };
    }
}
