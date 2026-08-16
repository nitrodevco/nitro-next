import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UpdateMessageMessageType = {
  // no fields

};

export class UpdateMessageMessage implements IIncomingPacket<UpdateMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UpdateMessageMessageType
  {

    const packet: UpdateMessageMessageType = {
    };

    return packet;
  }
}
