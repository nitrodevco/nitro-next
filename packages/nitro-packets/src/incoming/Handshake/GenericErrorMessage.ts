import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GenericErrorMessageType = {
    errorCode: number;
};

export class GenericErrorMessage implements IIncomingPacket<GenericErrorMessageType> {
    public parse(wrapper: IMessageDataWrapper): GenericErrorMessageType {
        const packet: GenericErrorMessageType = {
            errorCode: wrapper.readInt(),
        };

        return packet;
    }
}
