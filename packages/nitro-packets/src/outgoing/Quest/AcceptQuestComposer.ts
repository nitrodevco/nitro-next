// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AcceptQuestComposerType = {
    questId: number;
};

/** Flash `AcceptQuestMessageComposer`. */
export class AcceptQuestComposer implements IOutgoingPacket<AcceptQuestComposerType> {
    public constructor(private params: AcceptQuestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.questId,
        ];
    }
}
