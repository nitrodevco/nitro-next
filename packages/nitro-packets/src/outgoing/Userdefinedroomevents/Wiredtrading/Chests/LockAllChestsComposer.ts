// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type LockAllChestsComposerType = {
    /** True locks the room's chests, false unlocks them. */
    lock: boolean;
    /** The "lock all" button, sent only as `(true, true)` after a confirm; the plain lock and unlock buttons send false. */
    all: boolean;
};

/** Flash `LockAllChestsMessageComposer`, sent by the three chest control buttons of `WiredMenuChestsTab`. */
export class LockAllChestsComposer implements IOutgoingPacket<LockAllChestsComposerType> {
    public constructor(private params: LockAllChestsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.lock,
            this.params.all,
        ];
    }
}
