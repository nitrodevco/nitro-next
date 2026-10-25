// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { GetObjectDataFromWrapper, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ITradingItemListData } from './ITradingItemListData';

/**
 * Flash `ItemDataStructure(IMessageDataWrapper)`, the constructor trades use. The fields it sets
 * without reading (`secondsToExpiration = -1`, `flatId = -1`, `isRented = false`, ...) are not
 * on the wire and are left out.
 */
export const TradingItemListDataParser = (wrapper: IMessageDataWrapper): ITradingItemListData => {
    const itemId = wrapper.readInt();
    const itemType = wrapper.readString().toUpperCase();
    const roomItemId = wrapper.readInt();
    const itemTypeId = wrapper.readInt();
    const category = wrapper.readInt();
    const isGroupable = wrapper.readBoolean();
    const stuffData = GetObjectDataFromWrapper(wrapper);
    const creationDay = wrapper.readInt();
    const creationMonth = wrapper.readInt();
    const creationYear = wrapper.readInt();
    const extra = (itemType === 'S') ? wrapper.readInt() : -1;
    const isWallItem = (itemType === 'I');

    return { itemId, itemType, roomItemId, itemTypeId, category, isGroupable, stuffData, creationDay, creationMonth, creationYear, extra, isWallItem };
};
