import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RentableSpaceRentFailedMessageType = {
    reason: number;
};

export class RentableSpaceRentFailedMessage implements IIncomingPacket<RentableSpaceRentFailedMessageType> {
    public parse(wrapper: IMessageDataWrapper): RentableSpaceRentFailedMessageType {
        const packet: RentableSpaceRentFailedMessageType = {
            reason: wrapper.readInt(),
        };

        return packet;
    }
}
