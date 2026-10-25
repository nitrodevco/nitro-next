// Body filled by hand from the AS3 (`PickIssuesMessageComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `PickIssuesMessageComposer(issueIds, retryEnabled, retryCount, message)`.
export type PickIssuesComposerType = {
    issueIds: number[];
    retryEnabled: boolean;
    retryCount: number;
    message: string;
};

export class PickIssuesComposer implements IOutgoingPacket<PickIssuesComposerType> {
    public constructor(private params: PickIssuesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.issueIds.length, ...this.params.issueIds, this.params.retryEnabled, this.params.retryCount, this.params.message ];
    }
}
