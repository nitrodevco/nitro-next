import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { AchievementLevelUpDataParser } from './Data/AchievementLevelUpDataParser';
import { IAchievementLevelUpData } from './Data/IAchievementLevelUpData';

export type HabboAchievementNotificationMessageType = {
    data: IAchievementLevelUpData;
};

export class HabboAchievementNotificationMessage implements IIncomingPacket<HabboAchievementNotificationMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboAchievementNotificationMessageType {
        return {
            data: AchievementLevelUpDataParser(wrapper),
        };
    }
}
