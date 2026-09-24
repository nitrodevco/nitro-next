// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type KickMemberComposerType = {
    guildId: number;
    userId: number;
    /** Kicking the member and barring them from asking again - `handleUserBlock` rather than `handleUserKick`. */
    blocked: boolean;
};

/** `HabboGroupsManager.onKickConfirmationClose`, once the furniture-count confirmation is accepted. */
export class KickMemberComposer implements IOutgoingPacket<KickMemberComposerType> {
    public constructor(private params: KickMemberComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.guildId,
            this.params.userId,
            this.params.blocked,
        ];
    }
}
