import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetRespectNotificationEventMessageType = object;

export class PetRespectNotificationEventMessage implements IIncomingPacket<PetRespectNotificationEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetRespectNotificationEventMessageType {
        const packet: PetRespectNotificationEventMessageType = {
        };

        return packet;
    }
}
