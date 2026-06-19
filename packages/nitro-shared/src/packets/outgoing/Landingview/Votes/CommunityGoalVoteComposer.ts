import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CommunityGoalVoteComposerType = object;

export class CommunityGoalVoteComposer implements IOutgoingPacket<CommunityGoalVoteComposerType> {
    public constructor(private params: CommunityGoalVoteComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
