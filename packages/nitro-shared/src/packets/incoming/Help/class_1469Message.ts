import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type class_1469MessageType = {
  // no fields

};

export class class_1469Message implements IIncomingPacket<class_1469MessageType>
{
  public parse(wrapper: IMessageDataWrapper): class_1469MessageType
  {

    const packet: class_1469MessageType = {
    };

    return packet;
  }
}
