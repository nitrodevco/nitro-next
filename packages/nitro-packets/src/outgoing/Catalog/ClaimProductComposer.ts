// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ClaimProductComposerType = {
    /** The `special_items.<key>.free_claim` id being claimed. */
    claimId: string;
};

/** `ClaimProductMessageComposer`: `SpecialItemsController.makeClaim`. */
export class ClaimProductComposer implements IOutgoingPacket<ClaimProductComposerType> {
    public constructor(private params: ClaimProductComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.claimId,
        ];
    }
}
