import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FloorItemParser } from './Data/FloorItemParser';
import type { IRoomFloorItem } from './Data/IRoomFloorItem';

export type ObjectUpdateMessageType = {
    floorItem: IRoomFloorItem;
};

export class ObjectUpdateMessage implements IIncomingPacket<ObjectUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): ObjectUpdateMessageType {
        const packet: ObjectUpdateMessageType = {
            floorItem: FloorItemParser(wrapper)
        };

        return packet;
    }
}
