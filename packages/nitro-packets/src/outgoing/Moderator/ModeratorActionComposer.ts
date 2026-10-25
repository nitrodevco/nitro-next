// Body filled by hand from the AS3 (`ModeratorActionMessageComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `ModeratorActionMessageComposer(actionType, message, extra)`.
export type ModeratorActionComposerType = {
    /** 0 caution, 1 caution and kick, 3 message, 4 message and kick (`RoomToolCtrl.as:313-320`). */
    actionType: number;
    message: string;
    extra: string;
};

export class ModeratorActionComposer implements IOutgoingPacket<ModeratorActionComposerType> {
    public constructor(private params: ModeratorActionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.actionType, this.params.message, this.params.extra ];
    }
}
