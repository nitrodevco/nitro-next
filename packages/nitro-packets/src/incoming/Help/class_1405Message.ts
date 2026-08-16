import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type class_1405MessageType = {
  // no fields

};

export class class_1405Message implements IIncomingPacket<class_1405MessageType>
{
  public parse(wrapper: IMessageDataWrapper): class_1405MessageType
  {

    const packet: class_1405MessageType = {
    };

    return packet;
  }
}
