// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetIsUserPartOfCompetitionComposerType = {
    goalCode: string;
};

/** `GetIsUserPartOfCompetitionMessageComposer`: whether the user has a room in the goal's competition. */
export class GetIsUserPartOfCompetitionComposer implements IOutgoingPacket<GetIsUserPartOfCompetitionComposerType> {
    public constructor(private params: GetIsUserPartOfCompetitionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.goalCode,
        ];
    }
}
