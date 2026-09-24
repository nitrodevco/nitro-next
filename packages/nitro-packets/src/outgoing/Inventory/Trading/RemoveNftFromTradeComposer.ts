// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveNftFromTradeComposerType = {
    /** The wallet asset id to take back out. */
    assetId: number;
};

export class RemoveNftFromTradeComposer implements IOutgoingPacket<RemoveNftFromTradeComposerType> {
    public constructor(private params: RemoveNftFromTradeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.assetId,
        ];
    }
}
