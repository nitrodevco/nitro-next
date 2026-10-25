// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredClickUserComposerType = {
    /** The room index of the user that was clicked - not the user id. */
    userIndex: number;
};

/**
 * Flash `WiredClickUserMessageComposer`, sent by `HabboUserDefinedRoomEvents.userSelected` only
 * while `WiredEnvironmentMessage.hasClickUserWired` is set; answered by `WiredClickUserResponseMessage`.
 */
export class WiredClickUserComposer implements IOutgoingPacket<WiredClickUserComposerType> {
    public constructor(private params: WiredClickUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userIndex,
        ];
    }
}
