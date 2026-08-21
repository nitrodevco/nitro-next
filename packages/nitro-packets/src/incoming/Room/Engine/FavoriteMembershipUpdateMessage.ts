import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FavoriteMembershipUpdateMessageType = {
    roomIndex: number;
    habboGroupId: number;
    status: number;
    habboGroupName: string;
};

export class FavoriteMembershipUpdateMessage implements IIncomingPacket<FavoriteMembershipUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): FavoriteMembershipUpdateMessageType {
        const packet: FavoriteMembershipUpdateMessageType = {
            roomIndex: wrapper.readInt(),
            habboGroupId: wrapper.readInt(),
            status: wrapper.readInt(),
            habboGroupName: wrapper.readString(),
        };

        return packet;
    }
}
