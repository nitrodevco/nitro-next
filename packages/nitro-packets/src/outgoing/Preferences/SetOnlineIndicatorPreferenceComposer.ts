// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetOnlineIndicatorPreferenceComposerType = {
    /** `memenu.settings.other.friend.online.notification.<n>`: 0 everyone, 1 users in my relationship status, 2 nobody. */
    selection: number;
};

export class SetOnlineIndicatorPreferenceComposer implements IOutgoingPacket<SetOnlineIndicatorPreferenceComposerType> {
    public constructor(private params: SetOnlineIndicatorPreferenceComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.selection,
        ];
    }
}
