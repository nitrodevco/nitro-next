import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ObjectRemoveConfirmMessageType = {
  // no fields

};

export class ObjectRemoveConfirmMessage implements IIncomingPacket<ObjectRemoveConfirmMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ObjectRemoveConfirmMessageType
  {

    const packet: ObjectRemoveConfirmMessageType = {
    };

    return packet;
  }
}
