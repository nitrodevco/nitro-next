import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RentableSpaceRentOkMessageType = {
  expiryTime: number;
};

export class RentableSpaceRentOkMessage implements IIncomingPacket<RentableSpaceRentOkMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RentableSpaceRentOkMessageType
  {

    const packet: RentableSpaceRentOkMessageType = {
      expiryTime: wrapper.readInt(),
    };

    return packet;
  }
}
