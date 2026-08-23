import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetRespectFailedMessageType = {
    requiredDays: number;
    avatarAgeInDays: number;
};

export class PetRespectFailedMessage implements IIncomingPacket<PetRespectFailedMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetRespectFailedMessageType {
        const packet: PetRespectFailedMessageType = {
            requiredDays: wrapper.readInt(),
            avatarAgeInDays: wrapper.readInt(),
        };

        return packet;
    }
}
