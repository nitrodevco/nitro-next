import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboBroadcastMessageType = {
  messageText: string;
};

export class HabboBroadcastMessage implements IIncomingPacket<HabboBroadcastMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HabboBroadcastMessageType
  {
    const packet: HabboBroadcastMessageType = {
      messageText: wrapper.readString(),
    };

    return packet;
  }
}
