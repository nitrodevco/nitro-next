import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type class_1177MessageType = {
  // no fields

};

export class class_1177Message implements IIncomingPacket<class_1177MessageType>
{
  public parse(wrapper: IMessageDataWrapper): class_1177MessageType
  {

    const packet: class_1177MessageType = {
    };

    return packet;
  }
}
