import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UpdateThreadMessageType = {
  // no fields

};

export class UpdateThreadMessage implements IIncomingPacket<UpdateThreadMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UpdateThreadMessageType
  {

    const packet: UpdateThreadMessageType = {
    };

    return packet;
  }
}
