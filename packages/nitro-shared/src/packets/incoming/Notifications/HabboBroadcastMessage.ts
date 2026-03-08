import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboBroadcastMessageType = {
  // no fields

};

export class HabboBroadcastMessage implements IIncomingPacket<HabboBroadcastMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HabboBroadcastMessageType
  {

    const packet: HabboBroadcastMessageType = {
    };

    return packet;
  }
}
