// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMemberGuildItemCountComposerType = {
    groupId: number;
    userId: number;
};

/**
 * `HabboGroupsManager.handleUserKick` / `handleUserBlock`: asks how much of the member's furniture
 * stands in the base room, so the confirmation can say so. Flash passes the group as the first
 * argument and the member as the second.
 */
export class GetMemberGuildItemCountComposer implements IOutgoingPacket<GetMemberGuildItemCountComposerType> {
    public constructor(private params: GetMemberGuildItemCountComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.userId,
        ];
    }
}
