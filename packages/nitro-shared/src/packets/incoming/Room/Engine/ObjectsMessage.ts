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
            const floorItem = FloorItemParser(wrapper);

            floorItem.ownerName = packet.owners.get(floorItem.ownerId) ?? '';

            packet.floorItems.push(floorItem);

            count--;
        }

        return packet;
    }
}
