import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type DisconnectReasonEventMessageType = {
  // no fields

};

export class DisconnectReasonEventMessage implements IIncomingPacket<DisconnectReasonEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): DisconnectReasonEventMessageType
  {

    const packet: DisconnectReasonEventMessageType = {
    };

    return packet;
  }
}
