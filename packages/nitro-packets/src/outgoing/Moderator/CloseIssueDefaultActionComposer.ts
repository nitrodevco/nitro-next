// Body filled by hand from the AS3 (`CloseIssueDefaultActionMessageComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `CloseIssueDefaultActionMessageComposer(issueId, otherIssueIds, topicId)`.
export type CloseIssueDefaultActionComposerType = {
    issueId: number;
    otherIssueIds: number[];
    topicId: number;
};

export class CloseIssueDefaultActionComposer implements IOutgoingPacket<CloseIssueDefaultActionComposerType> {
    public constructor(private params: CloseIssueDefaultActionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.issueId, this.params.otherIssueIds.length, ...this.params.otherIssueIds, this.params.topicId ];
    }
}
