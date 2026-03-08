import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Reason: RentableSpaceRentFailedType): Unknown type 'RentableSpaceRentFailedType'. Add override mapping.

export type RentableSpaceRentFailedMessageType = {
  reason: any;
};

export class RentableSpaceRentFailedMessage implements IIncomingPacket<RentableSpaceRentFailedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RentableSpaceRentFailedMessageType
  {

    const packet: RentableSpaceRentFailedMessageType = {
      reason: undefined as any, // Unknown type 'RentableSpaceRentFailedType'. Add override mapping.
    };

    return packet;
  }
}
