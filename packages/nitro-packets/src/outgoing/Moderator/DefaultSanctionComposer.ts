// Body filled by hand from the AS3 (`DefaultSanctionMessageComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `DefaultSanctionMessageComposer(userId, topicId, message, issueId)`.
export type DefaultSanctionComposerType = {
    userId: number;
    topicId: number;
    message: string;
    /** -1 when not acting on an issue: then it is not sent. */
    issueId: number;
};

export class DefaultSanctionComposer implements IOutgoingPacket<DefaultSanctionComposerType> {
    public constructor(private params: DefaultSanctionComposerType) { }

    public compose(): (number | string | boolean)[] {
        const values: (number | string)[] = [ this.params.userId, this.params.topicId, this.params.message ];

        if (this.params.issueId !== -1) values.push(this.params.issueId);

        return values;
    }
}
