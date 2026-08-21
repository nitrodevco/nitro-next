import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type LoginFailedHotelClosedMessageType = {
  openHour: number;
  openMinute: number;
};

export class LoginFailedHotelClosedMessage implements IIncomingPacket<LoginFailedHotelClosedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): LoginFailedHotelClosedMessageType
  {
    const packet: LoginFailedHotelClosedMessageType = {
      openHour: wrapper.readInt(),
      openMinute: wrapper.readInt(),
    };

    return packet;
  }
}
