import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ChangeEmailResultEventMessageType = {
  result: number;
};

export class ChangeEmailResultEventMessage implements IIncomingPacket<ChangeEmailResultEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ChangeEmailResultEventMessageType
  {
    const packet: ChangeEmailResultEventMessageType = {
      result: wrapper.readInt(),
    };

    return packet;
  }
}
