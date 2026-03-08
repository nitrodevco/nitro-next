import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboAchievementNotificationMessageType = {
  // no fields

};

export class HabboAchievementNotificationMessage implements IIncomingPacket<HabboAchievementNotificationMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HabboAchievementNotificationMessageType
  {

    const packet: HabboAchievementNotificationMessageType = {
    };

    return packet;
  }
}
