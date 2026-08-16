import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type class_1547MessageType = {
  // no fields

};

export class class_1547Message implements IIncomingPacket<class_1547MessageType>
{
  public parse(wrapper: IMessageDataWrapper): class_1547MessageType
  {

    const packet: class_1547MessageType = {
    };

    return packet;
  }
}
