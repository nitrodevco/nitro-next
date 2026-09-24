// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuildMembershipsComposerType = object;

/** Asks for the groups the user belongs to - answered by `GuildMembershipsMessage`. */
export class GetGuildMembershipsComposer implements IOutgoingPacket<GetGuildMembershipsComposerType> {
    public constructor(private params: GetGuildMembershipsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
