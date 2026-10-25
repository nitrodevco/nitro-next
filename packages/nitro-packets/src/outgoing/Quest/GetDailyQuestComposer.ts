// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetDailyQuestComposerType = {
    /** Whether an easy quest is asked for, else a hard one. */
    easy: boolean;
    /** Which of that difficulty's quests: 0 on a refresh, one more for each "another quest". */
    index: number;
};

/** Flash `GetDailyQuestMessageComposer(easy, index)`. */
export class GetDailyQuestComposer implements IOutgoingPacket<GetDailyQuestComposerType> {
    public constructor(private params: GetDailyQuestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.easy,
            this.params.index,
        ];
    }
}
