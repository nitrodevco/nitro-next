// Body filled by hand from the AS3 (`ModAlertMessageComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `ModAlertMessageComposer(userId, message, topicId, issueId)`.
export type ModAlertComposerType = {
    userId: number;
    message: string;
    topicId: number;
    /** -1 when not acting on an issue: then it is not sent. */
    issueId: number;
};

export class ModAlertComposer implements IOutgoingPacket<ModAlertComposerType> {
    public constructor(private params: ModAlertComposerType) { }

    public compose(): (number | string | boolean)[] {
        const values: (number | string)[] = [ this.params.userId, this.params.message, this.params.topicId ];

        if (this.params.issueId !== -1) values.push(this.params.issueId);

        return values;
    }
}
