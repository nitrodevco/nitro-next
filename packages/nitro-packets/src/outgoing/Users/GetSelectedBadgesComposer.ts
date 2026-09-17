// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSelectedBadgesComposerType = {
    userId: number;
};

export class GetSelectedBadgesComposer implements IOutgoingPacket<GetSelectedBadgesComposerType> {
    public constructor(private params: GetSelectedBadgesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId,
        ];
    }
}
