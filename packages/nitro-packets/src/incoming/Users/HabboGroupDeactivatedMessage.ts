import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboGroupDeactivatedMessageType = {
  // no fields

};

export class HabboGroupDeactivatedMessage implements IIncomingPacket<HabboGroupDeactivatedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HabboGroupDeactivatedMessageType
  {

    const packet: HabboGroupDeactivatedMessageType = {
    };

    return packet;
  }
}
