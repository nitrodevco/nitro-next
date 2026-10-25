// Body filled by hand from the AS3 (`CloseIssuesMessageComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `CloseIssuesMessageComposer(issueIds, closeReason)`: the reason goes first.
export type CloseIssuesComposerType = {
    issueIds: number[];
    closeReason: number;
};

export class CloseIssuesComposer implements IOutgoingPacket<CloseIssuesComposerType> {
    public constructor(private params: CloseIssuesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.closeReason, this.params.issueIds.length, ...this.params.issueIds ];
    }
}
