import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type InfoHotelClosedMessageType = {
  openHour: number;
  openMinute: number;
  userThrownOutAtClose: boolean;
};

export class InfoHotelClosedMessage implements IIncomingPacket<InfoHotelClosedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): InfoHotelClosedMessageType
  {
    const packet: InfoHotelClosedMessageType = {
      openHour: wrapper.readInt(),
      openMinute: wrapper.readInt(),
      userThrownOutAtClose: wrapper.readBoolean(),
    };

    return packet;
  }
}
