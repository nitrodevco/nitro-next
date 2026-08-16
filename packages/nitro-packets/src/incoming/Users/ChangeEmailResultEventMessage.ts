import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ChangeEmailResultEventMessageType = {
  // no fields

};

export class ChangeEmailResultEventMessage implements IIncomingPacket<ChangeEmailResultEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ChangeEmailResultEventMessageType
  {

    const packet: ChangeEmailResultEventMessageType = {
    };

    return packet;
  }
}
