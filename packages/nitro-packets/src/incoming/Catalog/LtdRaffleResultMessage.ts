// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `LtdRaffleResultMessageEventParser`: how a limited edition raffle ended. */
export type LtdRaffleResultMessageType = {
    /** The furni class name of the limited item raffled. */
    className: string;
    /** 0 is a win (`hasWon`); 1-3 are the parser's three obfuscated ways of losing. */
    resultCode: number;
};

export class LtdRaffleResultMessage implements IIncomingPacket<LtdRaffleResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): LtdRaffleResultMessageType {
        return {
            className: wrapper.readString(),
            resultCode: wrapper.readByte(),
        };
    }
}
