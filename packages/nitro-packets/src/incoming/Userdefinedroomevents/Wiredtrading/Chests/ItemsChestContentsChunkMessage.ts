import { IChestStorage, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ChestStorageParser } from './Data/ChestStorageParser';

export type ItemsChestContentsChunkMessageType = {
    chestId: number;
    totalFragments: number;
    fragmentNo: number;
    storageChunk: IChestStorage[];
};

export class ItemsChestContentsChunkMessage implements IIncomingPacket<ItemsChestContentsChunkMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemsChestContentsChunkMessageType {
        const chestId = wrapper.readInt();
        const totalFragments = wrapper.readInt();
        const fragmentNo = wrapper.readInt();
        const storageChunk: IChestStorage[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            storageChunk.push(ChestStorageParser(wrapper));

            count--;
        }

        const packet: ItemsChestContentsChunkMessageType = {
            chestId,
            totalFragments,
            fragmentNo,
            storageChunk,
        };

        return packet;
    }
}
