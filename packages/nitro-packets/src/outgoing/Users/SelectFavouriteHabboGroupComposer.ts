// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SelectFavouriteHabboGroupComposerType = {
    groupId: number;
};

/** Wears the group's badge - `GuildMembershipsController.onFavouriteClick`. */
export class SelectFavouriteHabboGroupComposer implements IOutgoingPacket<SelectFavouriteHabboGroupComposerType> {
    public constructor(private params: SelectFavouriteHabboGroupComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
        ];
    }
}
