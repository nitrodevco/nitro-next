import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IBannedUserData = {
    userId: number;
    userName: string;
};

/* BannedUsersFromRoomParser — roomId + BannedUserData list */
export type BannedUsersFromRoomEventMessageType = {
    roomId: number;
    bannedUsers: IBannedUserData[];
};

export class BannedUsersFromRoomEventMessage implements IIncomingPacket<BannedUsersFromRoomEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): BannedUsersFromRoomEventMessageType {
        const roomId = wrapper.readInt();
        const bannedUsers: IBannedUserData[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            bannedUsers.push({ userId: wrapper.readInt(), userName: wrapper.readString() });

            count--;
        }

        return { roomId, bannedUsers };
    }
}
