import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetSupplementedNotificationEventMessageType = {
    petId: number;
    userId: number;
    supplementType: number;
};

export class PetSupplementedNotificationEventMessage implements IIncomingPacket<PetSupplementedNotificationEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetSupplementedNotificationEventMessageType {
        const packet: PetSupplementedNotificationEventMessageType = {
            petId: wrapper.readInt(),
            userId: wrapper.readInt(),
            supplementType: wrapper.readInt(),
        };

        return packet;
    }
}
