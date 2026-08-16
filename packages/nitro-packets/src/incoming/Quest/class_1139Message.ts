import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type class_1139MessageType = {
  // no fields

};

export class class_1139Message implements IIncomingPacket<class_1139MessageType>
{
  public parse(wrapper: IMessageDataWrapper): class_1139MessageType
  {

    const packet: class_1139MessageType = {
    };

    return packet;
  }
}
