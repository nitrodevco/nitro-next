// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DeselectFavouriteHabboGroupComposerType = {
    groupId: number;
};

/** Takes the group's badge off - `GuildMembershipsController.onFavouriteClick`. */
export class DeselectFavouriteHabboGroupComposer implements IOutgoingPacket<DeselectFavouriteHabboGroupComposerType> {
    public constructor(private params: DeselectFavouriteHabboGroupComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
        ];
    }
}
