// Body filled by hand from the AS3 (`ModMuteMessageComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `ModMuteMessageComposer(userId, message, topicId, issueId)`.
export type ModMuteComposerType = {
    userId: number;
    message: string;
    topicId: number;
    /** -1 when not acting on an issue: then it is not sent. */
    issueId: number;
};

export class ModMuteComposer implements IOutgoingPacket<ModMuteComposerType> {
    public constructor(private params: ModMuteComposerType) { }

    public compose(): (number | string | boolean)[] {
        const values: (number | string)[] = [ this.params.userId, this.params.message, this.params.topicId ];

        if (this.params.issueId !== -1) values.push(this.params.issueId);

        return values;
    }
}
