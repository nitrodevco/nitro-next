import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AchievementEventMessageType = {
  // no fields

};

export class AchievementEventMessage implements IIncomingPacket<AchievementEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AchievementEventMessageType
  {

    const packet: AchievementEventMessageType = {
    };

    return packet;
  }
}
