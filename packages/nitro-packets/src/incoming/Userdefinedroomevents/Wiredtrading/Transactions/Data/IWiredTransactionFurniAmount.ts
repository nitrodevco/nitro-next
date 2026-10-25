// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IChestItemType } from '@nitrodevco/nitro-api';

/** One entry of the two `ChestItemType -> amount` maps in Flash `WiredTransactionDetails`, kept as a list so the key stays a plain object. */
export interface IWiredTransactionFurniAmount {
    itemType: IChestItemType;
    amount: number;
}
