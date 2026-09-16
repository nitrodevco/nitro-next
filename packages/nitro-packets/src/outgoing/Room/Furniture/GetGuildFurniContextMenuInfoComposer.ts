// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuildFurniContextMenuInfoComposerType = {
    objectId: number;
    /** The guild the furni was customised for, off its own model. */
    guildId: number;
};

export class GetGuildFurniContextMenuInfoComposer implements IOutgoingPacket<GetGuildFurniContextMenuInfoComposerType> {
    public constructor(private params: GetGuildFurniContextMenuInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.guildId,
        ];
    }
}
