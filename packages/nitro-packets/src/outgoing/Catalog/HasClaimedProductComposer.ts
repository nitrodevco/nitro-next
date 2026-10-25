// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type HasClaimedProductComposerType = {
    /** The `special_items.<key>.free_claim` id asked about. */
    claimId: string;
};

/** `HasClaimedProductMessageComposer`: `SpecialItemsController.initialize`. */
export class HasClaimedProductComposer implements IOutgoingPacket<HasClaimedProductComposerType> {
    public constructor(private params: HasClaimedProductComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.claimId,
        ];
    }
}
