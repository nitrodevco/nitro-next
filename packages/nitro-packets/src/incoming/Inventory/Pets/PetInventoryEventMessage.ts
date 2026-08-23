import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetInventoryEventMessageType = object;

export class PetInventoryEventMessage implements IIncomingPacket<PetInventoryEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetInventoryEventMessageType {
        const packet: PetInventoryEventMessageType = {
        };

        return packet;
    }
}
