// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RejectQuestComposerType = {
    questId: number;
};

/** Flash `RejectQuestMessageComposer`. */
export class RejectQuestComposer implements IOutgoingPacket<RejectQuestComposerType> {
    public constructor(private params: RejectQuestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.questId,
        ];
    }
}
