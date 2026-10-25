// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetHabboGroupDetailsComposerType = {
    groupId: number;
    openDetails: boolean;
};

export class GetHabboGroupDetailsComposer implements IOutgoingPacket<GetHabboGroupDetailsComposerType> {
    public constructor(private params: GetHabboGroupDetailsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.openDetails,
        ];
    }
}
