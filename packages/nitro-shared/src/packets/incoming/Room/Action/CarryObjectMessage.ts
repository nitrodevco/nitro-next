import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CarryObjectMessageType = {
  userId: number;
  itemType: number;
};

export class CarryObjectMessage implements IIncomingPacket<CarryObjectMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CarryObjectMessageType
  {

    const packet: CarryObjectMessageType = {
      userId: wrapper.readInt(),
      itemType: wrapper.readInt(),
    };

    return packet;
  }
}
