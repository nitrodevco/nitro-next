import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboGroupBadgesMessageType = {
  // no fields

};

export class HabboGroupBadgesMessage implements IIncomingPacket<HabboGroupBadgesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HabboGroupBadgesMessageType
  {

    const packet: HabboGroupBadgesMessageType = {
    };

    return packet;
  }
}
