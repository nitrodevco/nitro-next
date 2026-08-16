import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FurnitureOwnersParser } from './Data/FurnitureOwnersParser';
import type { IRoomWallItem } from './Data/IRoomWallItem';
import { WallItemParser } from './Data/WallItemParser';

export type ItemsMessageType = {
    owners: Map<number, string>;
    wallItems: IRoomWallItem[];
};

export class ItemsMessage implements IIncomingPacket<ItemsMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemsMessageType {
        const packet: ItemsMessageType = {
            owners: FurnitureOwnersParser(wrapper),
            wallItems: []
        };

        let count = wrapper.readInt();

        while (count > 0) {
            const item = WallItemParser(wrapper);

            item.ownerName = packet.owners.get(item.ownerId) ?? '';

            packet.wallItems.push(item);

            count--;
        }

        return packet;
    }
}
