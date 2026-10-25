// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CommunityGoalVoteComposerType = {
    /** `HabboLandingView.communityGoalVote`: the option voted for, 1 or 2. */
    vote: number;
};

export class CommunityGoalVoteComposer implements IOutgoingPacket<CommunityGoalVoteComposerType> {
    public constructor(private params: CommunityGoalVoteComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.vote,
        ];
    }
}
