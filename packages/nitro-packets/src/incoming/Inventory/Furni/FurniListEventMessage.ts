import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FurniListAddOrUpdateFurniParser } from './Data/FurniListAddOrUpdateFurniParser';
import { IFurniListAddOrUpdateFurni } from './Data/IFurniListAddOrUpdateFurni';

export type FurniListEventMessageType = {
    totalFragments: number;
    fragmentNo: number;
    furniFragment: Map<number, IFurniListAddOrUpdateFurni>;
};

export class FurniListEventMessage implements IIncomingPacket<FurniListEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): FurniListEventMessageType {
        const totalFragments = wrapper.readInt();
        const fragmentNo = wrapper.readInt();
        const furniFragment = new Map();
        const count = wrapper.readInt();
        for (let i2 = 0; i2 < count; i2++) {
            const loc4 = FurniListAddOrUpdateFurniParser(wrapper);
            furniFragment.set(loc4.itemId, loc4);
        }
        return { totalFragments, fragmentNo, furniFragment };
    }
}
