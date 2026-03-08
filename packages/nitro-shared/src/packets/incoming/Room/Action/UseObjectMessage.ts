import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UseObjectMessageType = {
  userId: number;
  itemType: number;
};

export class UseObjectMessage implements IIncomingPacket<UseObjectMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UseObjectMessageType
  {

    const packet: UseObjectMessageType = {
      userId: wrapper.readInt(),
      itemType: wrapper.readInt(),
    };

    return packet;
  }
}
