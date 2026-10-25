// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * Flash `NftTransferAssetsResultMessageEvent`: the answer to a transfer out of the Collector wallet;
 * `resultCode` 0 is success, anything else is shown in `collectibles.transfer.error` (`%id%`).
 */
export type NftTransferAssetsResultMessageType = {
    resultCode: number;
};

export class NftTransferAssetsResultMessage implements IIncomingPacket<NftTransferAssetsResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): NftTransferAssetsResultMessageType {
        return { resultCode: wrapper.readShort() };
    }
}
