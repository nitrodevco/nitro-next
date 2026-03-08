import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboGroupJoinFailedMessageType = {
  // no fields

};

export class HabboGroupJoinFailedMessage implements IIncomingPacket<HabboGroupJoinFailedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HabboGroupJoinFailedMessageType
  {

    const packet: HabboGroupJoinFailedMessageType = {
    };

    return packet;
  }
}
