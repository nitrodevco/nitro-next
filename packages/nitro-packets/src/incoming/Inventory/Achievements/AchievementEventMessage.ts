import { IAchievementData, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';
import { AchievementDataParser } from './Data/AchievementDataParser';

export type AchievementEventMessageType = {
    achievement: IAchievementData;
};

export class AchievementEventMessage implements IIncomingPacket<AchievementEventMessageType>
{
    public parse(wrapper: IMessageDataWrapper): AchievementEventMessageType
    {
        const packet: AchievementEventMessageType = {
            achievement: AchievementDataParser(wrapper),
        };

        return packet;
    }
}
