import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { IRoomWallItem } from './Data/IRoomWallItem';
import { WallItemParser } from './Data/WallItemParser';

export type ItemAddMessageType = {
    wallItem: IRoomWallItem;
};

export class ItemAddMessage implements IIncomingPacket<ItemAddMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemAddMessageType {
        const packet: ItemAddMessageType = {
            wallItem: WallItemParser(wrapper)
        };

        packet.wallItem.ownerName = wrapper.readString();

        return packet;
    }
}
