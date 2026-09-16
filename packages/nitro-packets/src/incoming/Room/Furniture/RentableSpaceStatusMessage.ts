// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RentableSpaceStatusMessageType = {
    rented: boolean;
    /** Zero when the space may be rented; otherwise why not. */
    canRentErrorCode: number;
    canRent: boolean;
    renterId: number;
    renterName: string;
    /** Seconds left on the current rent. */
    timeRemaining: number;
    price: number;
};

export class RentableSpaceStatusMessage implements IIncomingPacket<RentableSpaceStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): RentableSpaceStatusMessageType {
        const rented = wrapper.readBoolean();
        const canRentErrorCode = wrapper.readInt();

        const renterId = wrapper.readInt();
        const renterName = wrapper.readString();

        const packet: RentableSpaceStatusMessageType = {
            rented,
            canRentErrorCode,
            canRent: (canRentErrorCode === 0),
            // A space nobody holds still carries a renter on the wire; it means nothing.
            renterId: rented ? renterId : -1,
            renterName: rented ? renterName : '',
            timeRemaining: wrapper.readInt(),
            price: wrapper.readInt(),
        };

        return packet;
    }
}
