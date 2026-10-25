// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetNftTradeInventoryComposerType = object;

/** Asks for the NFTs a trade may offer; answered by `TradeNftAssetInventoryMessage`. */
export class GetNftTradeInventoryComposer implements IOutgoingPacket<GetNftTradeInventoryComposerType> {
    public constructor(private params: GetNftTradeInventoryComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
