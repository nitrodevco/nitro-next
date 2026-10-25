// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FlatControllerParser } from './Data/FlatControllerParser';
import { IFlatController } from './Data/IFlatController';

export type BannedUsersFromRoomEventMessageType = {
    roomId: number;
    /** `BannedUserData` is the same user/name pair the rights list uses. */
    bannedUsers: IFlatController[];
};

export class BannedUsersFromRoomEventMessage implements IIncomingPacket<BannedUsersFromRoomEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): BannedUsersFromRoomEventMessageType {
        const packet: BannedUsersFromRoomEventMessageType = {
            roomId: wrapper.readInt(),
            bannedUsers: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.bannedUsers.push(FlatControllerParser(wrapper));

            count--;
        }

        return packet;
    }
}
