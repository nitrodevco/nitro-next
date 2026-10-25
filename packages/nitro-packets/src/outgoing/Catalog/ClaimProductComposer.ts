// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ClaimProductComposerType = {
    /** The `special_items.<key>.free_claim` (or `cursed_dragon_adoption.claim_id`) id being claimed. */
    claimId: string;
    /** The option picked - the adoption window's 0 (blue) or 1 (purple). Left off the wire when -1, the default. */
    choice?: number;
};

/** `ClaimProductMessageComposer(claimId, choice = -1)`: `SpecialItemsController.makeClaim`, `CursedDragonAdoptionController.makeClaim`. */
export class ClaimProductComposer implements IOutgoingPacket<ClaimProductComposerType> {
    public constructor(private params: ClaimProductComposerType) { }

    public compose(): (number | string | boolean)[] {
        const choice = this.params.choice ?? -1;

        return (choice !== -1) ? [ this.params.claimId, choice ] : [ this.params.claimId ];
    }
}
