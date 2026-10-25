// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseStrings } from '@nitrodevco/nitro-api';

export type GetCustomFilterResultMessageType = {
    /** `GetCustomFilterResultMessageEventParser.words` - every word the account already filters. */
    words: string[];
};

export class GetCustomFilterResultMessage implements IIncomingPacket<GetCustomFilterResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): GetCustomFilterResultMessageType {
        const words = ParseStrings(wrapper);

        return { words };
    }
}
