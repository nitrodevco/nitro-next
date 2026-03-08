import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboActivityPointNotificationMessageType = {
  // no fields

};

export class HabboActivityPointNotificationMessage implements IIncomingPacket<HabboActivityPointNotificationMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HabboActivityPointNotificationMessageType
  {

    const packet: HabboActivityPointNotificationMessageType = {
    };

    return packet;
  }
}
