import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { IPetFigureData } from '../../Data/PetFigureDataParser';
import { PetFigureDataParser } from '../../Data/PetFigureDataParser';

export type PetFigureUpdateMessageType = {
    roomIndex: number;
    petId: number;
    figureData: IPetFigureData;
    hasSaddle: boolean;
    isRiding: boolean;
};

export class PetFigureUpdateMessage implements IIncomingPacket<PetFigureUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetFigureUpdateMessageType {
        const packet: PetFigureUpdateMessageType = {
            roomIndex: 0,
            petId: 0,
            figureData: {} as any,
            hasSaddle: false,
            isRiding: false,
        };

        packet.roomIndex = wrapper.readInt();
        packet.petId = wrapper.readInt();
        packet.figureData = PetFigureDataParser(wrapper);
        packet.hasSaddle = wrapper.readBoolean();
        packet.isRiding = wrapper.readBoolean();

        return packet;
    }
}
