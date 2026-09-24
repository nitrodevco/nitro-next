// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateGuildColorsComposerType = {
    groupId: number;
    primaryColorId: number;
    secondaryColorId: number;
};

/** `GuildManagementWindowCtrl.saveView` for the colours step. */
export class UpdateGuildColorsComposer implements IOutgoingPacket<UpdateGuildColorsComposerType> {
    public constructor(private params: UpdateGuildColorsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.primaryColorId,
            this.params.secondaryColorId,
        ];
    }
}
