// Body filled by hand from the AS3 (`ModToolSanctionComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `ModToolSanctionComposer(issueId, accountId, topicId)`: an issue's (`requestSanctionData`, account -1) or an
// account's (`requestSanctionDataForAccount`, issue -1) default sanction for a topic, answered with `CfhSanction`.
export type ModToolSanctionComposerType = {
    issueId: number;
    accountId: number;
    topicId: number;
};

export class ModToolSanctionComposer implements IOutgoingPacket<ModToolSanctionComposerType> {
    public constructor(private params: ModToolSanctionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.issueId, this.params.accountId, this.params.topicId ];
    }
}
