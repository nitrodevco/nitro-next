import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ExtendedProfileMessageType = {
  // no fields

};

export class ExtendedProfileMessage implements IIncomingPacket<ExtendedProfileMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ExtendedProfileMessageType
  {

    const packet: ExtendedProfileMessageType = {
    };

    return packet;
  }
}
