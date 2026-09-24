// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddNftToTradeComposerType = {
    /** The wallet asset ids to offer, the count first. */
    assetIds: readonly number[];
};

export class AddNftToTradeComposer implements IOutgoingPacket<AddNftToTradeComposerType> {
    public constructor(private params: AddNftToTradeComposerType) { }

    public compose(): (number | string | boolean)[] {
        const data: (number | string | boolean)[] = [];

        data.push(this.params.assetIds.length);

        for (const assetId of this.params.assetIds) {
            data.push(assetId);
        }

        return data;
    }
}
