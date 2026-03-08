import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type InfoHotelClosedMessageType = {
  // no fields

};

export class InfoHotelClosedMessage implements IIncomingPacket<InfoHotelClosedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): InfoHotelClosedMessageType
  {

    const packet: InfoHotelClosedMessageType = {
    };

    return packet;
  }
}
