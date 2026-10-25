// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HasClaimedProductResponseMessageType = {
    claimId: string;
    hasClaimed: boolean;
};

/** `HasClaimedProductResponseMessageEvent` (parser `§_-zu§`): the answer to `HasClaimedProductComposer`. */
export class HasClaimedProductResponseMessage implements IIncomingPacket<HasClaimedProductResponseMessageType> {
    public parse(wrapper: IMessageDataWrapper): HasClaimedProductResponseMessageType {
        const claimId = wrapper.readString();
        const hasClaimed = wrapper.readBoolean();

        return { claimId, hasClaimed };
    }
}
