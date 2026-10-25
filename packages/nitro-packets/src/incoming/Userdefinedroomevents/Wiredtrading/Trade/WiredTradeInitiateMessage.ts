// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ITradeRequirement } from '../Data/ITradeRequirement';
import { TradeRequirementParser } from '../Data/TradeRequirementParser';

export type WiredTradeInitiateMessageType = {
    requirement: ITradeRequirement;
    /** Open on the requirements rather than on the inventory. */
    showRequirementsImmediate: boolean;
    /** Replace a wired trade that is already open instead of being ignored. */
    overridePreviousTrade: boolean;
    timeoutSeconds: number;
};

/** A wired box opens a trade with the user. Flash parser `wiredtrading.trade._-It`, handled by `WiredTradingModel`. */
export class WiredTradeInitiateMessage implements IIncomingPacket<WiredTradeInitiateMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredTradeInitiateMessageType {
        const requirement = TradeRequirementParser(wrapper);
        const showRequirementsImmediate = wrapper.readBoolean();
        const overridePreviousTrade = wrapper.readBoolean();
        const timeoutSeconds = wrapper.readInt();

        return { requirement, showRequirementsImmediate, overridePreviousTrade, timeoutSeconds };
    }
}
