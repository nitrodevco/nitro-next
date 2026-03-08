import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SecondsUntilMessageType = {
  // no fields

};

export class SecondsUntilMessage implements IIncomingPacket<SecondsUntilMessageType>
{
  public parse(wrapper: IMessageDataWrapper): SecondsUntilMessageType
  {

    const packet: SecondsUntilMessageType = {
    };

    return packet;
  }
}
