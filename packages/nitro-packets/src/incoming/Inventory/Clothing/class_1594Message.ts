import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type class_1594MessageType = {
  // no fields

};

export class class_1594Message implements IIncomingPacket<class_1594MessageType>
{
  public parse(wrapper: IMessageDataWrapper): class_1594MessageType
  {

    const packet: class_1594MessageType = {
    };

    return packet;
  }
}
