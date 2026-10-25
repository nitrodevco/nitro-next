// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ForwardToACompetitionRoomComposerType = {
    goalCode: string;
    userId: number;
};

/** Flash `ForwardToACompetitionRoomMessageComposer(goalCode, userId)`: the competition room of that user. */
export class ForwardToACompetitionRoomComposer implements IOutgoingPacket<ForwardToACompetitionRoomComposerType> {
    public constructor(private params: ForwardToACompetitionRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.goalCode,
            this.params.userId,
        ];
    }
}
