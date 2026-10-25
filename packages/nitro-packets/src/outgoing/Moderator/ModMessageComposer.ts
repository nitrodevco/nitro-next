// Body filled by hand from the AS3 (`ModMessageMessageComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `ModMessageMessageComposer(userId, message, topicId, issueId)`: two empty strings sit between the message and the topic.
export type ModMessageComposerType = {
    userId: number;
    message: string;
    topicId: number;
    /** -1 when not acting on an issue: then it is not sent. */
    issueId: number;
};

export class ModMessageComposer implements IOutgoingPacket<ModMessageComposerType> {
    public constructor(private params: ModMessageComposerType) { }

    public compose(): (number | string | boolean)[] {
        const values: (number | string)[] = [ this.params.userId, this.params.message, '', '', this.params.topicId ];

        if (this.params.issueId !== -1) values.push(this.params.issueId);

        return values;
    }
}
