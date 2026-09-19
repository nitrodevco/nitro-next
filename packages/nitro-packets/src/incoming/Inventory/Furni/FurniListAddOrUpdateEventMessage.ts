// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { FurniListAddOrUpdateFurniParser } from './Data/FurniListAddOrUpdateFurniParser';
import { IFurniListAddOrUpdateFurni } from './Data/IFurniListAddOrUpdateFurni';

export type FurniListAddOrUpdateEventMessageType = {
    furni: IFurniListAddOrUpdateFurni[];
};

export class FurniListAddOrUpdateEventMessage implements IIncomingPacket<FurniListAddOrUpdateEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): FurniListAddOrUpdateEventMessageType {
        return { furni: ParseArray(wrapper, FurniListAddOrUpdateFurniParser) };
    }
}
