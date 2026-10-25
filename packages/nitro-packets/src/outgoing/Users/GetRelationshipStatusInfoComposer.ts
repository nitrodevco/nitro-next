// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetRelationshipStatusInfoComposerType = {
    userId: number;
};

export class GetRelationshipStatusInfoComposer implements IOutgoingPacket<GetRelationshipStatusInfoComposerType> {
    public constructor(private params: GetRelationshipStatusInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId,
        ];
    }
}
