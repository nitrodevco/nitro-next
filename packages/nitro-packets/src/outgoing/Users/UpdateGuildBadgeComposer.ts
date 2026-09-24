// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateGuildBadgeComposerType = {
    groupId: number;
    /** `partId, colorId, position` per layer - `BadgeEditorCtrl.getBadgeSettings`. */
    badgeSettings: number[];
};

/**
 * `GuildManagementWindowCtrl.saveView` for the badge step. The tool reads this composer as a
 * `(groupId, userId)` pair; Flash's `UpdateGuildBadgeMessageComposer` writes a length-prefixed
 * int array, which is what is sent here.
 */
export class UpdateGuildBadgeComposer implements IOutgoingPacket<UpdateGuildBadgeComposerType> {
    public constructor(private params: UpdateGuildBadgeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.badgeSettings.length,
            ...this.params.badgeSettings.map(value => Math.trunc(value)),
        ];
    }
}
