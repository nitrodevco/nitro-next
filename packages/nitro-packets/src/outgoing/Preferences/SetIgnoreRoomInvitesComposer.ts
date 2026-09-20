// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetIgnoreRoomInvitesComposerType = {
    roomInvitesIgnored: boolean;
};

export class SetIgnoreRoomInvitesComposer implements IOutgoingPacket<SetIgnoreRoomInvitesComposerType> {
    public constructor(private params: SetIgnoreRoomInvitesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomInvitesIgnored,
        ];
    }
}
