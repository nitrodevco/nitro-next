import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FurniListRemoveEventMessageType = {
    stripId: number;
};

export class FurniListRemoveEventMessage implements IIncomingPacket<FurniListRemoveEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): FurniListRemoveEventMessageType {
        const packet: FurniListRemoveEventMessageType = {
            stripId: wrapper.readInt(),
        };

        return packet;
    }
}
