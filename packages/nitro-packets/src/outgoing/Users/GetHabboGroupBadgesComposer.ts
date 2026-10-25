// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetHabboGroupBadgesComposerType = object;

/** Asks for the badge code behind every group id the client may draw - answered by `HabboGroupBadgesMessage`. */
export class GetHabboGroupBadgesComposer implements IOutgoingPacket<GetHabboGroupBadgesComposerType> {
    public constructor(private params: GetHabboGroupBadgesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
