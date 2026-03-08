import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AchievementsEventMessageType = {
  // no fields

};

export class AchievementsEventMessage implements IIncomingPacket<AchievementsEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AchievementsEventMessageType
  {

    const packet: AchievementsEventMessageType = {
    };

    return packet;
  }
}
