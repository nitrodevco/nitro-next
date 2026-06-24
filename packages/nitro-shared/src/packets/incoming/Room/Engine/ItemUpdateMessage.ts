import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { IRoomWallItem } from './Data/IRoomWallItem';
import { WallItemParser } from './Data/WallItemParser';

export type ItemUpdateMessageType = {
    wallItem: IRoomWallItem;
};

export class ItemUpdateMessage implements IIncomingPacket<ItemUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): ItemUpdateMessageType {
        const packet: ItemUpdateMessageType = {
            wallItem: WallItemParser(wrapper)
        };

        return packet;
    }
}
