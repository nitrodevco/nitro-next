import { CatalogPurchaseErrorType, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PurchaseNotAllowedMessageType = {
    errorType: CatalogPurchaseErrorType;
};

export class PurchaseNotAllowedMessage implements IIncomingPacket<PurchaseNotAllowedMessageType> {
    public parse(wrapper: IMessageDataWrapper): PurchaseNotAllowedMessageType {
        return {
            errorType: wrapper.readInt()
        }
    }
}
