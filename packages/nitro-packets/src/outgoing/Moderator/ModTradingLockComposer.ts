// Body filled by hand from the AS3 (`ModTradingLockMessageComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `ModTradingLockMessageComposer(userId, message, lengthMinutes, topicId, issueId)`.
export type ModTradingLockComposerType = {
    userId: number;
    message: string;
    lengthMinutes: number;
    topicId: number;
    /** -1 when not acting on an issue: then it is not sent. */
    issueId: number;
};

export class ModTradingLockComposer implements IOutgoingPacket<ModTradingLockComposerType> {
    public constructor(private params: ModTradingLockComposerType) { }

    public compose(): (number | string | boolean)[] {
        const values: (number | string)[] = [ this.params.userId, this.params.message, this.params.lengthMinutes, this.params.topicId ];

        if (this.params.issueId !== -1) values.push(this.params.issueId);

        return values;
    }
}
