// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** The options on the chest window itself; each mirrors a key of the chest furni's data map. */
export type SetChestOptionsComposerType = {
    chestId: number;
    /** `locked` */
    isLocked: boolean;
    /** `auto_lock` */
    autoLock: boolean;
    /** `capacity`: how many items the chest takes (the total in "space used"), typed into the capacity input. */
    capacity: number;
};

/** Flash `SetChestOptionsMessageComposer`, sent by `WiredChestWrapperView`. */
export class SetChestOptionsComposer implements IOutgoingPacket<SetChestOptionsComposerType> {
    public constructor(private params: SetChestOptionsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
            this.params.isLocked,
            this.params.autoLock,
            this.params.capacity,
        ];
    }
}
