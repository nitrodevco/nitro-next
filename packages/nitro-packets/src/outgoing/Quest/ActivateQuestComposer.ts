// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ActivateQuestComposerType = {
    questId: number;
};

/** Flash `ActivateQuestMessageComposer`. */
export class ActivateQuestComposer implements IOutgoingPacket<ActivateQuestComposerType> {
    public constructor(private params: ActivateQuestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.questId,
        ];
    }
}
