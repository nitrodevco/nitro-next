import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ExtendedProfileChangedMessageType = {
  // no fields

};

export class ExtendedProfileChangedMessage implements IIncomingPacket<ExtendedProfileChangedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ExtendedProfileChangedMessageType
  {

    const packet: ExtendedProfileChangedMessageType = {
    };

    return packet;
  }
}
