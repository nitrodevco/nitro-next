import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetPlacingErrorMessageType = {
    errorCode: number;
};

export class PetPlacingErrorMessage implements IIncomingPacket<PetPlacingErrorMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetPlacingErrorMessageType {
        const packet: PetPlacingErrorMessageType = {
            errorCode: 0,
        };

        packet.errorCode = wrapper.readInt();

        return packet;
    }
}
