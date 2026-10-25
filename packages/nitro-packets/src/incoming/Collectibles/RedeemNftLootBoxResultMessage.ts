// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * Flash `RedeemNftLootBoxResultMessageEvent`: the answer to opening an NFT reward box - `resultCode` 0
 * success, 1 failure, 2 the box is not in the user's Collector wallet.
 */
export type RedeemNftLootBoxResultMessageType = {
    resultCode: number;
};

export class RedeemNftLootBoxResultMessage implements IIncomingPacket<RedeemNftLootBoxResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): RedeemNftLootBoxResultMessageType {
        return { resultCode: wrapper.readShort() };
    }
}
