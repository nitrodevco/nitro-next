import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CompetitionRoomsDataParser } from './Data/CompetitionRoomsDataParser';
import { ICompetitionRoomsData } from './Data/ICompetitionRoomsData';

export type CompetitionRoomsDataMessageType = {
    data: ICompetitionRoomsData;
};

export class CompetitionRoomsDataMessage implements IIncomingPacket<CompetitionRoomsDataMessageType> {
    public parse(wrapper: IMessageDataWrapper): CompetitionRoomsDataMessageType {
        const data = CompetitionRoomsDataParser(wrapper);
        return { data };
    }
}
