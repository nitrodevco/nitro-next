import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type class_1263MessageType = {
  // no fields

};

export class class_1263Message implements IIncomingPacket<class_1263MessageType>
{
  public parse(wrapper: IMessageDataWrapper): class_1263MessageType
  {

    const packet: class_1263MessageType = {
    };

    return packet;
  }
}
