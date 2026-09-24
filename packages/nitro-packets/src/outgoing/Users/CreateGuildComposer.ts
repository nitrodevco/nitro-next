// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CreateGuildComposerType = {
    groupName: string;
    groupDescription: string;
    /** The room that becomes the group's base - it must be one the user owns. */
    roomId: number;
    primaryColorId: number;
    secondaryColorId: number;
    /** The badge as `BadgeEditorCtrl.getBadgeSettings` builds it: `partId, colorId, position` per layer. */
    badgeSettings: number[];
};

/** `GuildManagementWindowCtrl.sendCreateGuildMessage`. */
export class CreateGuildComposer implements IOutgoingPacket<CreateGuildComposerType> {
    public constructor(private params: CreateGuildComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupName,
            this.params.groupDescription,
            this.params.roomId,
            this.params.primaryColorId,
            this.params.secondaryColorId,
            this.params.badgeSettings.length,
            ...this.params.badgeSettings.map(value => Math.trunc(value)),
        ];
    }
}
