import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IUserGameAchievementsData } from './Data/IUserGameAchievementsData';
import { UserGameAchievementsDataParser } from './Data/UserGameAchievementsDataParser';

export type UserGameAchievementsMessageType = {
    gameTypeId: number;
    field_O1M: IUserGameAchievementsData;
};

export class UserGameAchievementsMessage implements IIncomingPacket<UserGameAchievementsMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserGameAchievementsMessageType {
        const gameTypeId = wrapper.readInt();
        const field_O1M = UserGameAchievementsDataParser(wrapper);
        return { gameTypeId, field_O1M };
    }
}
