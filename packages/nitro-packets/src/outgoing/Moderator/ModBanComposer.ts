// Body filled by hand from the AS3 (`ModBanMessageComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `ModBanMessageComposer(userId, message, topicId, sanctionTypeId, avatarOnly, issueId)`.
export type ModBanComposerType = {
    userId: number;
    message: string;
    topicId: number;
    sanctionTypeId: number;
    avatarOnly: boolean;
    /** -1 when not acting on an issue: then it is not sent. */
    issueId: number;
};

export class ModBanComposer implements IOutgoingPacket<ModBanComposerType> {
    public constructor(private params: ModBanComposerType) { }

    public compose(): (number | string | boolean)[] {
        const values: (number | string | boolean)[] = [ this.params.userId, this.params.message, this.params.topicId, this.params.sanctionTypeId, this.params.avatarOnly ];

        if (this.params.issueId !== -1) values.push(this.params.issueId);

        return values;
    }
}
