import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type LoginFailedHotelClosedMessageType = {
  // no fields

};

export class LoginFailedHotelClosedMessage implements IIncomingPacket<LoginFailedHotelClosedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): LoginFailedHotelClosedMessageType
  {

    const packet: LoginFailedHotelClosedMessageType = {
    };

    return packet;
  }
}
