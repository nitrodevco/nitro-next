import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ClubGiftInfoEventMessageType = {
  // no fields

};

export class ClubGiftInfoEventMessage implements IIncomingPacket<ClubGiftInfoEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ClubGiftInfoEventMessageType
  {

    const packet: ClubGiftInfoEventMessageType = {
    };

    return packet;
  }
}
