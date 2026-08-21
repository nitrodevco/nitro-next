import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type InfoHotelClosingMessageType = {
  minutesUntilClosing: number;
};

export class InfoHotelClosingMessage implements IIncomingPacket<InfoHotelClosingMessageType>
{
  public parse(wrapper: IMessageDataWrapper): InfoHotelClosingMessageType
  {
    const packet: InfoHotelClosingMessageType = {
      minutesUntilClosing: wrapper.readInt(),
    };

    return packet;
  }
}
