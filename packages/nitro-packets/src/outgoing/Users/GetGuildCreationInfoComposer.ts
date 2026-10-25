// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuildCreationInfoComposerType = object;

/** Opens the creation wizard - answered by `GuildCreationInfoMessage`. */
export class GetGuildCreationInfoComposer implements IOutgoingPacket<GetGuildCreationInfoComposerType> {
    public constructor(private params: GetGuildCreationInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
