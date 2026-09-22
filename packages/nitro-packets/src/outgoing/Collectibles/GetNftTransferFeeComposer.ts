// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `GetNftTransferFeeMessageComposer`: the silver fee of a transfer out of the Collector wallet.
 */
export type GetNftTransferFeeComposerType = object;

export class GetNftTransferFeeComposer implements IOutgoingPacket<GetNftTransferFeeComposerType> {
    public constructor(private params: GetNftTransferFeeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [];
    }
}
