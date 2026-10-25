// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IObjectData } from '@nitrodevco/nitro-api';

/** Flash `ItemDataStructure` as a trade sends it: the inventory item without its rent and recycle fields. */
export interface ITradingItemListData {
    itemId: number;
    /** `S` or `I`, upper-cased as Flash does. */
    itemType: string;
    roomItemId: number;
    itemTypeId: number;
    category: number;
    isGroupable: boolean;
    stuffData: IObjectData;
    creationDay: number;
    creationMonth: number;
    creationYear: number;
    /** Floor items only; -1 for a wall item. */
    extra: number;
    isWallItem: boolean;
}
