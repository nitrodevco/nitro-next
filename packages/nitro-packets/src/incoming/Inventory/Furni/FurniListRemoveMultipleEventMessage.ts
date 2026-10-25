import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { NumbersParser } from '../../Room/Engine/Data/NumbersParser';

export type FurniListRemoveMultipleEventMessageType = {
    stripIds: number[];
};

/** Flash `inventory/furni/§_-7u§` (WIN63-202610151745): a count, then each strip id that left the furni list. */
export class FurniListRemoveMultipleEventMessage implements IIncomingPacket<FurniListRemoveMultipleEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): FurniListRemoveMultipleEventMessageType {
        const packet: FurniListRemoveMultipleEventMessageType = {
            stripIds: NumbersParser(wrapper),
        };

        return packet;
    }
}
