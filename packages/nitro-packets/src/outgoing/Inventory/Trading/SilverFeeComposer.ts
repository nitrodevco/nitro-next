// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SilverFeeComposerType = {
    /** `true` puts one more silver of the user's own into the trade's fee, `false` takes one back. */
    add: boolean;
};

export class SilverFeeComposer implements IOutgoingPacket<SilverFeeComposerType> {
    public constructor(private params: SilverFeeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.add,
        ];
    }
}
