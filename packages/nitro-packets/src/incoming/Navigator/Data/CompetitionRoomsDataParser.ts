// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ICompetitionRoomsData } from './ICompetitionRoomsData';

export const CompetitionRoomsDataParser = (wrapper: IMessageDataWrapper): ICompetitionRoomsData => {
    return {
        goalId: wrapper.readInt(),
        pageIndex: wrapper.readInt(),
        pageCount: wrapper.readInt(),
    };
};
