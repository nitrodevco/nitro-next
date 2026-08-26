import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { IPetFigureData } from '../Data/PetFigureDataParser';
import { PetFigureDataParser } from '../Data/PetFigureDataParser';

export type PetLevelNotificationEventMessageType = {
    petId: number;
    petName: string;
    level: number;
    figureData: IPetFigureData;
};

export class PetLevelNotificationEventMessage implements IIncomingPacket<PetLevelNotificationEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetLevelNotificationEventMessageType {
        const packet: PetLevelNotificationEventMessageType = {
            petId: 0,
            petName: '',
            level: 0,
            figureData: {} as any,
        };

        packet.petId = wrapper.readInt();
        packet.petName = wrapper.readString();
        packet.level = wrapper.readInt();
        packet.figureData = PetFigureDataParser(wrapper);

        return packet;
    }
}
