import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FavoriteMembershipUpdateMessageType = {
    // no fields

};

export class FavoriteMembershipUpdateMessage implements IIncomingPacket<FavoriteMembershipUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): FavoriteMembershipUpdateMessageType {

        const packet: FavoriteMembershipUpdateMessageType = {
        };

        return packet;
    }
}
