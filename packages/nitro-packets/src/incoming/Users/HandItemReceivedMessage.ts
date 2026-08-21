import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HandItemReceivedMessageType = {
  giverUserId: number;
  handItemType: number;
};

export class HandItemReceivedMessage implements IIncomingPacket<HandItemReceivedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HandItemReceivedMessageType
  {
    const packet: HandItemReceivedMessageType = {
      giverUserId: wrapper.readInt(),
      handItemType: wrapper.readInt(),
    };

    return packet;
  }
}
