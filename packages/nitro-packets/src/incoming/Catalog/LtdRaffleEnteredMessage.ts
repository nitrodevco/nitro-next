// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `LtdRaffleEnteredMessageEventParser`: the purchase of a limited edition item went into its raffle. */
export type LtdRaffleEnteredMessageType = {
    /** The furni class name of the limited item raffled. */
    className: string;
};

export class LtdRaffleEnteredMessage implements IIncomingPacket<LtdRaffleEnteredMessageType> {
    public parse(wrapper: IMessageDataWrapper): LtdRaffleEnteredMessageType {
        return {
            className: wrapper.readString(),
        };
    }
}
