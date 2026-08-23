import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ConfirmBreedingResultEventMessageType = {
    breedingNestStuffId: number;
    result: number;
};

export class ConfirmBreedingResultEventMessage implements IIncomingPacket<ConfirmBreedingResultEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ConfirmBreedingResultEventMessageType {
        const packet: ConfirmBreedingResultEventMessageType = {
            breedingNestStuffId: wrapper.readInt(),
            result: wrapper.readInt(),
        };

        return packet;
    }
}
