import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IAchievementLevelUpData } from '../Data/AchievementLevelUpDataParser';
import { AchievementLevelUpDataParser } from '../Data/AchievementLevelUpDataParser';

export type HabboAchievementNotificationMessageType = {
    data: IAchievementLevelUpData;
};

export class HabboAchievementNotificationMessage implements IIncomingPacket<HabboAchievementNotificationMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboAchievementNotificationMessageType {
        const packet: HabboAchievementNotificationMessageType = {
            data: {} as any,
        };

        packet.data = AchievementLevelUpDataParser(wrapper);

        return packet;
    }
}
