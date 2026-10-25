// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IChestStorage, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ChestStorageParser } from './Data/ChestStorageParser';

export type ItemsChestContentsUpdatedMessageType = {
    chestId: number;
    removedIds: number[];
    addedStorage: IChestStorage[];
};

export class ItemsChestContentsUpdatedMessage implements IIncomingPacket<ItemsChestContentsUpdatedMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemsChestContentsUpdatedMessageType {
        const chestId = wrapper.readInt();
        const removedIds: number[] = [];
        const addedStorage: IChestStorage[] = [];

        let removedCount = wrapper.readInt();

        while (removedCount > 0) {
            removedIds.push(wrapper.readInt());

            removedCount--;
        }

        let addedCount = wrapper.readInt();

        while (addedCount > 0) {
            addedStorage.push(ChestStorageParser(wrapper));

            addedCount--;
        }

        const packet: ItemsChestContentsUpdatedMessageType = {
            chestId,
            removedIds,
            addedStorage,
        };

        return packet;
    }
}
