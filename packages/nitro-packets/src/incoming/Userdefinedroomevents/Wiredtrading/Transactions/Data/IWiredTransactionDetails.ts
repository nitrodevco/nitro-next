// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IWiredTransactionFurniAmount } from './IWiredTransactionFurniAmount';
import { IWiredTransactionInfo } from './IWiredTransactionInfo';

/** Flash `WiredTransactionDetails`. */
export interface IWiredTransactionDetails {
    transactionInfo: IWiredTransactionInfo;
    chestIds: number[];
    depositedFurnis: IWiredTransactionFurniAmount[];
    withdrawnFurnis: IWiredTransactionFurniAmount[];
    /** The server had to leave part of the transaction out. */
    isIncompleteData: boolean;
}
