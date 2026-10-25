// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/** Flash `WiredTransactionInfo`: one line of a transaction log. */
export interface IWiredTransactionInfo {
    /** A long; pass it back in `WiredTransactionGetLogDetailsComposer`. */
    transactionId: number;
    flatId: number;
    /** 0..4; the client only ever shows it as the text `wired_transactions.type.<n>`. */
    transactionType: number;
    transactionDefinitionInfo: string;
    userId: number;
    userName: string;
    /** A long. */
    timestamp: number;
    readableTimestamp: string;
    chestCount: number;
    withdrawFurniCount: number;
    depositFurniCount: number;
    withdrawCoinsCount: number;
    depositCoinsCount: number;
}
