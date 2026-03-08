import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FurniListInvalidateEventMessageType = {
  // no fields

};

export class FurniListInvalidateEventMessage implements IIncomingPacket<FurniListInvalidateEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FurniListInvalidateEventMessageType
  {

    const packet: FurniListInvalidateEventMessageType = {
    };

    return packet;
  }
}
