import { IAchievementData, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';
import { AchievementDataParser } from './Data/AchievementDataParser';

export type AchievementsEventMessageType = {
    achievements: IAchievementData[];
    defaultCategory: string;
};

export class AchievementsEventMessage implements IIncomingPacket<AchievementsEventMessageType>
{
    public parse(wrapper: IMessageDataWrapper): AchievementsEventMessageType
    {
        const packet: AchievementsEventMessageType = {
            achievements: [],
            defaultCategory: '',
        };

        let totalCount = wrapper.readInt();

        while (totalCount > 0)
        {
            packet.achievements.push(AchievementDataParser(wrapper));

            totalCount--;
        }

        packet.defaultCategory = wrapper.readString();

        return packet;
    }
}
