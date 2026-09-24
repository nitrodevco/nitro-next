// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateGuildSettingsComposerType = {
    groupId: number;
    /** `GUILD_TYPE_*`. */
    guildType: number;
    /** `GUILD_RIGHTS_*`. */
    rightsLevel: number;
};

/** `GuildManagementWindowCtrl.saveView` for the settings step. */
export class UpdateGuildSettingsComposer implements IOutgoingPacket<UpdateGuildSettingsComposerType> {
    public constructor(private params: UpdateGuildSettingsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.guildType,
            this.params.rightsLevel,
        ];
    }
}
