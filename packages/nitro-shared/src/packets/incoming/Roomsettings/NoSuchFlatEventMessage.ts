import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NoSuchFlatEventMessageType = {
  // no fields

};

export class NoSuchFlatEventMessage implements IIncomingPacket<NoSuchFlatEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NoSuchFlatEventMessageType
  {

    const packet: NoSuchFlatEventMessageType = {
    };

    return packet;
  }
}
