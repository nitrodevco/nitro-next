// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ForwardToRandomCompetitionRoomComposerType = {
    goalCode: string;
};

/** `ForwardToRandomCompetitionRoomMessageComposer`: a random room entered in the goal's competition. */
export class ForwardToRandomCompetitionRoomComposer implements IOutgoingPacket<ForwardToRandomCompetitionRoomComposerType> {
    public constructor(private params: ForwardToRandomCompetitionRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.goalCode,
        ];
    }
}
