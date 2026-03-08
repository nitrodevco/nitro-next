import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RestoreClientMessageType = {
  // no fields

};

export class RestoreClientMessage implements IIncomingPacket<RestoreClientMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RestoreClientMessageType
  {

    const packet: RestoreClientMessageType = {
    };

    return packet;
  }
}
