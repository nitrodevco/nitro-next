import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `ReleaseIssuesMessageComposer(issueIds)`.
export type ReleaseIssuesComposerType = {
    issueIds: number[];
};

export class ReleaseIssuesComposer implements IOutgoingPacket<ReleaseIssuesComposerType> {
    public constructor(private params: ReleaseIssuesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.issueIds.length, ...this.params.issueIds ];
    }
}
