// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPetFigureData, PetFigureDataParser } from '../../Data/PetFigureDataParser';

export type PetFigureUpdateMessageType = {
    roomIndex: number;
    petId: number;
    figureData: IPetFigureData;
    hasSaddle: boolean;
    isRiding: boolean;
};

/** A pet's look changed - dyed, saddled, mounted - for everyone in the room. */
export class PetFigureUpdateMessage implements IIncomingPacket<PetFigureUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetFigureUpdateMessageType {
        return {
            roomIndex: wrapper.readInt(),
            petId: wrapper.readInt(),
            figureData: PetFigureDataParser(wrapper),
            hasSaddle: wrapper.readBoolean(),
            isRiding: wrapper.readBoolean(),
        };
    }
}
