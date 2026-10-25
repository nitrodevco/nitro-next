// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetUserPermanentVariablesComposerType = {
    /** `RoomObjectUserType` as a number: 1 user, 2 pet, 4 bot. */
    entityType: number;
    /** `IWiredUserVariablesElement.entityId`. */
    entityId: number;
};

/** Flash `_-Ye.WiredGetUserPermanentVariablesComposer`, sent by the variable management views; answered by `WiredUserPermanentVariablesMessage`. */
export class WiredGetUserPermanentVariablesComposer implements IOutgoingPacket<WiredGetUserPermanentVariablesComposerType> {
    public constructor(private params: WiredGetUserPermanentVariablesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.entityType,
            this.params.entityId,
        ];
    }
}
