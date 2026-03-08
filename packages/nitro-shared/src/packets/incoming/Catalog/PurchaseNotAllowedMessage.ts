import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ErrorType: CatalogPurchaseErrorType): Unknown type 'CatalogPurchaseErrorType'. Add override mapping.

export type PurchaseNotAllowedMessageType = {
  errorType: any;
};

export class PurchaseNotAllowedMessage implements IIncomingPacket<PurchaseNotAllowedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PurchaseNotAllowedMessageType
  {

    const packet: PurchaseNotAllowedMessageType = {
      errorType: undefined as any, // Unknown type 'CatalogPurchaseErrorType'. Add override mapping.
    };

    return packet;
  }
}
