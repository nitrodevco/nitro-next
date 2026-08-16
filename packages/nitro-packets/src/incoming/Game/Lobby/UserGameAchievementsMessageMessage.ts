import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserGameAchievementsMessageMessageType = {
  // no fields

};

export class UserGameAchievementsMessageMessage implements IIncomingPacket<UserGameAchievementsMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UserGameAchievementsMessageMessageType
  {

    const packet: UserGameAchievementsMessageMessageType = {
    };

    return packet;
  }
}
