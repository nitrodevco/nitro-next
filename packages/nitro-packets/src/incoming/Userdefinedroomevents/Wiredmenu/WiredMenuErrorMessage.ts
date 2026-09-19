import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredMenuErrorMessageType = {
    errorCode: number;
};

export class WiredMenuErrorMessage implements IIncomingPacket<WiredMenuErrorMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredMenuErrorMessageType {
        const errorCode = wrapper.readShort();
        return { errorCode };
    }
}
