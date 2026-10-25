// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type JoinHabboGroupComposerType = {
    groupId: number;
};

export class JoinHabboGroupComposer implements IOutgoingPacket<JoinHabboGroupComposerType> {
    public constructor(private params: JoinHabboGroupComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
        ];
    }
}
