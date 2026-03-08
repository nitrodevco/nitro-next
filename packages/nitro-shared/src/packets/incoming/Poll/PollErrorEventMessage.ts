import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PollErrorEventMessageType = {
  // no fields

};

export class PollErrorEventMessage implements IIncomingPacket<PollErrorEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PollErrorEventMessageType
  {

    const packet: PollErrorEventMessageType = {
    };

    return packet;
  }
}
