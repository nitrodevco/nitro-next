import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FloorItemParser } from './Data/FloorItemParser';
import { FurnitureOwnersParser } from './Data/FurnitureOwnersParser';
import type { IRoomFloorItem } from './Data/IRoomFloorItem';

export type ObjectsMessageType = {
    owners: Map<number, string>;
    floorItems: IRoomFloorItem[];
};

export class ObjectsMessage implements IIncomingPacket<ObjectsMessageType> {
    public parse(wrapper: IMessageDataWrapper): ObjectsMessageType {
        const packet: ObjectsMessageType = {
            owners: FurnitureOwnersParser(wrapper),
            floorItems: []
        };

        let count = wrapper.readInt();

        while (count > 0) {
            const item = FloorItemParser(wrapper);

            item.ownerName = packet.owners.get(item.ownerId) ?? '';

            packet.floorItems.push(item);

            count--;
        }

        return packet;
    }
}
