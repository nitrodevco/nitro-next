import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type InfoHotelClosingMessageType = {
  // no fields

};

export class InfoHotelClosingMessage implements IIncomingPacket<InfoHotelClosingMessageType>
{
  public parse(wrapper: IMessageDataWrapper): InfoHotelClosingMessageType
  {

    const packet: InfoHotelClosingMessageType = {
    };

    return packet;
  }
}
