import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type class_1487MessageType = {
  // no fields

};

export class class_1487Message implements IIncomingPacket<class_1487MessageType>
{
  public parse(wrapper: IMessageDataWrapper): class_1487MessageType
  {

    const packet: class_1487MessageType = {
    };

    return packet;
  }
}
