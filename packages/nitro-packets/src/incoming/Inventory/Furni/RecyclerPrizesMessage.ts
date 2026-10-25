// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IPrizeLevelMessageData } from './Data/IPrizeLevelMessageData';
import { PrizeLevelMessageDataParser } from './Data/PrizeLevelMessageDataParser';

/** Flash `RecyclerPrizesMessageEvent` (`RecyclerPrizesMessageParser`): the recycler's prize table, one entry per level. */
export type RecyclerPrizesMessageType = {
    prizeLevels: IPrizeLevelMessageData[];
};

export class RecyclerPrizesMessage implements IIncomingPacket<RecyclerPrizesMessageType> {
    public parse(wrapper: IMessageDataWrapper): RecyclerPrizesMessageType {
        const prizeLevels = ParseArray(wrapper, PrizeLevelMessageDataParser);

        return { prizeLevels };
    }
}
