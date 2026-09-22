// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * Flash `NftClaimResultMessageEvent`: the answer to claiming every reward claim; `resultCode` 0 is
 * success, anything else is shown in `collectibles.claiming.failed` (`%id%`).
 */
export type NftClaimResultMessageType = {
    resultCode: number;
};

export class NftClaimResultMessage implements IIncomingPacket<NftClaimResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): NftClaimResultMessageType {
        return { resultCode: wrapper.readShort() };
    }
}
