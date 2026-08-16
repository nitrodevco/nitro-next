import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';
import { InstantMessageErrorCodeType } from './Data/InstantMessageErrorCodeType';

export type InstantMessageErrorMessageType = {
    errorCode: InstantMessageErrorCodeType;
    playerId: number;
    message: string;
};

export class InstantMessageErrorMessage implements IIncomingPacket<InstantMessageErrorMessageType> {
    public parse(wrapper: IMessageDataWrapper): InstantMessageErrorMessageType {
        const packet: InstantMessageErrorMessageType = {
            errorCode: wrapper.readInt(),
            playerId: wrapper.readInt(),
            message: wrapper.readString(),
        };

        return packet;
    }
}
