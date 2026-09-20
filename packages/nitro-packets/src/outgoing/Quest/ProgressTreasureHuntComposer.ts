// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * `ProgressTreasureHuntMessageComposer` - one step of a hidden treasure hunt: the hunt's id
 * (every Flash caller sends `wf15`) and the token of the step found (the wired quick menu's
 * "Erase from existence" sends the box's holder key and code, `action1`).
 */
export type ProgressTreasureHuntComposerType = {
    huntId: string;
    token: string;
};

export class ProgressTreasureHuntComposer implements IOutgoingPacket<ProgressTreasureHuntComposerType> {
    public constructor(private params: ProgressTreasureHuntComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.huntId,
            this.params.token,
        ];
    }
}
