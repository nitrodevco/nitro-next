// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type TriggerHabbiconComposerType = {
    habbiconId: number;
};

/** `TriggerHabbiconMessageComposer`: the habbicon the user picked in the chat bar, shown over them in the room. */
export class TriggerHabbiconComposer implements IOutgoingPacket<TriggerHabbiconComposerType> {
    public constructor(private params: TriggerHabbiconComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.habbiconId,
        ];
    }
}
