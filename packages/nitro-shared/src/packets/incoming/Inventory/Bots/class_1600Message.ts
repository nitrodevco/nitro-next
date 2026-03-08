import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type class_1600MessageType = {
  // no fields

};

export class class_1600Message implements IIncomingPacket<class_1600MessageType>
{
  public parse(wrapper: IMessageDataWrapper): class_1600MessageType
  {

    const packet: class_1600MessageType = {
    };

    return packet;
  }
}
