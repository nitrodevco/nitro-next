import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PhoneCollectionStateMessageType = {
  // no fields

};

export class PhoneCollectionStateMessage implements IIncomingPacket<PhoneCollectionStateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PhoneCollectionStateMessageType
  {

    const packet: PhoneCollectionStateMessageType = {
    };

    return packet;
  }
}
