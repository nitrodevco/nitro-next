// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCommunityGoalHallOfFameComposerType = {
    /** The timing code the hall of fame's schedule answered (`CommunityGoalHallOfFameWidget.onTimingCode`). */
    code: string;
};

/** Flash `GetCommunityGoalHallOfFameMessageComposer(code)`. */
export class GetCommunityGoalHallOfFameComposer implements IOutgoingPacket<GetCommunityGoalHallOfFameComposerType> {
    public constructor(private params: GetCommunityGoalHallOfFameComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.code,
        ];
    }
}
