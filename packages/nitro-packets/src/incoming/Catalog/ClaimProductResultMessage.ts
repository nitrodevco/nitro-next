// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ClaimProductResultMessageType = {
    claimId: string;
    /** Picks the `claim_product.result.<result>` text. */
    result: number;
};

/** `ClaimProductResultMessageEvent` (`ClaimProductResultParser`): the answer to `ClaimProductComposer`. */
export class ClaimProductResultMessage implements IIncomingPacket<ClaimProductResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): ClaimProductResultMessageType {
        const claimId = wrapper.readString();
        const result = wrapper.readInt();

        return { claimId, result };
    }
}
