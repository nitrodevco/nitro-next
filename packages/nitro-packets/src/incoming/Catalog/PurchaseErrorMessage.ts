import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PurchaseErrorMessageType = {
    errorCode: number;
};

export class PurchaseErrorMessage implements IIncomingPacket<PurchaseErrorMessageType> {
    public parse(wrapper: IMessageDataWrapper): PurchaseErrorMessageType {
        return {
            errorCode: wrapper.readInt()
        }
    }
}
