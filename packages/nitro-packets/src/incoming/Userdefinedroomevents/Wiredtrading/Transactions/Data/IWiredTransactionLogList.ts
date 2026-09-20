// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IWiredTransactionInfo } from './IWiredTransactionInfo';
import { WiredTransactionLogListType } from './WiredTransactionLogListType';

/** Flash `WiredTransactionLogList`: one page of a chest or room transaction log. */
export interface IWiredTransactionLogList {
    logListType: WiredTransactionLogListType;
    /** A long on the wire: the chest id or the room id, by `logListType`. */
    logListId: number;
    totalLogs: number;
    /** 1-based. */
    currentPage: number;
    /** The page size the server used. */
    amount: number;
    logs: IWiredTransactionInfo[];
}
