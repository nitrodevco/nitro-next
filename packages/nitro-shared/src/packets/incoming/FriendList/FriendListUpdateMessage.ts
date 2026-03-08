import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(FriendCategories: List<FriendCategorySnapshot>): List<T> requires custom read loop (length + items).
// TODO(Updates: List<FriendListUpdateSnapshot>): List<T> requires custom read loop (length + items).

export type FriendListUpdateMessageType = {
    friendCategories: any[];
    updates: any[];
};

export class FriendListUpdateMessage implements IIncomingPacket<FriendListUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): FriendListUpdateMessageType {
        const packet: FriendListUpdateMessageType = {
            friendCategories: undefined as any, // List<T> requires custom read loop (length + items).
            updates: undefined as any, // List<T> requires custom read loop (length + items).
        };

        return packet;
    }
}
