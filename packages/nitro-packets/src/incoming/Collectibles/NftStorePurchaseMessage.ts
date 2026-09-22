// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * Flash `NftStorePurchaseMessageEvent` (parser `§_-m1c§`): the answer to buying a collectibles shop
 * offer - `result` 0 is success, 1 (`§_-Q1a§`) a purchase error (`HabboCatalog.onNftStorePurchase`).
 */
export type NftStorePurchaseMessageType = {
    result: number;
};

export class NftStorePurchaseMessage implements IIncomingPacket<NftStorePurchaseMessageType> {
    public parse(wrapper: IMessageDataWrapper): NftStorePurchaseMessageType {
        return { result: wrapper.readShort() };
    }
}
