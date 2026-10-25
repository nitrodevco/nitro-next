// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPetFigureData, PetFigureDataParser } from '../Data/PetFigureDataParser';

export type PetLevelNotificationEventMessageType = {
    petId: number;
    petName: string;
    level: number;
    figureData: IPetFigureData;
};

export class PetLevelNotificationEventMessage implements IIncomingPacket<PetLevelNotificationEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetLevelNotificationEventMessageType {
        const petId = wrapper.readInt();
        const petName = wrapper.readString();
        const level = wrapper.readInt();
        const figureData = PetFigureDataParser(wrapper);

        return { petId, petName, level, figureData };
    }
}
