import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(CanRentErrorCode: RentableSpaceRentFailedType): Unknown type 'RentableSpaceRentFailedType'. Add override mapping.

export type RentableSpaceStatusMessageType = {
  rented: boolean;
  canRentErrorCode: any;
  renterId: number;
  renterName: string;
  timeRemaining: number;
  price: number;
};

export class RentableSpaceStatusMessage implements IIncomingPacket<RentableSpaceStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RentableSpaceStatusMessageType
  {

    const packet: RentableSpaceStatusMessageType = {
      rented: wrapper.readBoolean(),
      canRentErrorCode: undefined as any, // Unknown type 'RentableSpaceRentFailedType'. Add override mapping.
      renterId: wrapper.readInt(),
      renterName: wrapper.readString(),
      timeRemaining: wrapper.readInt(),
      price: wrapper.readInt(),
    };

    return packet;
  }
}
