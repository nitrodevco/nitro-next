import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FloorItemParser } from './Data/FloorItemParser';
import type { IRoomFloorItem } from './Data/IRoomFloorItem';

export type ObjectAddMessageType = {
    floorItem: IRoomFloorItem;
};

export class ObjectAddMessage implements IIncomingPacket<ObjectAddMessageType> {
    public parse(wrapper: IMessageDataWrapper): ObjectAddMessageType {
        const packet: ObjectAddMessageType = {
            floorItem: FloorItemParser(wrapper)
        };

        packet.floorItem.ownerName = wrapper.readString();

        return packet;
    }
}
