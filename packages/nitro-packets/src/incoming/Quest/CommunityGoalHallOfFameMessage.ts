// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { HallOfFameEntryDataParser, IHallOfFameEntryData } from '../Data/HallOfFameEntryDataParser';

/** Flash `CommunityGoalHallOfFame`: the goal's code and its leaders, in rank order. */
export interface ICommunityGoalHallOfFameData {
    goalCode: string;
    hof: IHallOfFameEntryData[];
}

export type CommunityGoalHallOfFameMessageType = {
    data: ICommunityGoalHallOfFameData;
};

/** Flash `CommunityGoalHallOfFameMessageParser` (obfuscated `_-bW`): `new CommunityGoalHallOfFame(wrapper)`. */
export class CommunityGoalHallOfFameMessage implements IIncomingPacket<CommunityGoalHallOfFameMessageType> {
    public parse(wrapper: IMessageDataWrapper): CommunityGoalHallOfFameMessageType {
        const goalCode = wrapper.readString();
        const hof: IHallOfFameEntryData[] = [];
        let count = wrapper.readInt();

        while (count-- > 0) hof.push(HallOfFameEntryDataParser(wrapper));

        return { data: { goalCode, hof } };
    }
}
